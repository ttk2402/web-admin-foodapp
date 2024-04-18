import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import axios from 'axios';
import "./chart.css";
//Đã check
const ProductPieChart = () => {
    const [productData, setProductData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/product/');
                const productSalesPromises = response.data.map(async product => {
                    const salesResponse = await axios.get(`http://localhost:8080/api/order/purchases/${product.id}`);
                    return {
                        name: product.name,
                        value: salesResponse.data
                    };
                });
                const productSalesData = await Promise.all(productSalesPromises);
                const filteredProductData = productSalesData.filter(product => product.value > 0);
                setProductData(filteredProductData);
                const total = productSalesData.reduce((acc, cur) => acc + cur.value, 0);
                setTotalSales(total);
            } catch (error) {
                console.error('Error fetching product sales:', error);
            }
        };

        fetchData();
    }, []);
    const COLORS = [
        '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ef4a4a', '#8794ec', '#f0b0f6', '#f0e369',
        '#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'
    ];
    const RADIAN = Math.PI / 180;
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        );
    };
    return (
        <div className='chart'>
            <h1 className="title">Đánh giá tỷ lệ bán của các món ăn</h1>
            <ResponsiveContainer width="100%" aspect={5 / 2}>
                <PieChart>
                    <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {productData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        align="right"
                        verticalAlign="middle"
                        layout="vertical"
                        height={36}
                        formatter={(value, entry, index) => <span style={{ color: COLORS[index] }}>{value}</span>}
                    />
                    <Tooltip
                        formatter={(value, name, props) => {
                            const percent = ((props.value / productData.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(1);
                            return [`${name}: ${value} suất chiếm ${percent}%`];
                        }}
                    />
                </PieChart>
                <div className="total-sales">
                    Tổng số suất đã bán: {totalSales} suất
                </div>
            </ResponsiveContainer>

        </div >
    );
}
export default ProductPieChart;
