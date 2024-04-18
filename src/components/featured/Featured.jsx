import "./featured.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

//Đã check
const Featured = ({ revenue, expected, type }) => {
    const [revenueData, setRevenue] = useState(null);
    const [expData, setExpData] = useState(null);
    const [typeData, setTypeData] = useState(null);
    const [exceedMessage, setExceedMessage] = useState(null);
    const [exceedMessageShown, setExceedMessageShown] = useState(false);
    const [inputValue, setInputValue] = useState(expected.toString()); // State để lưu giá trị nhập vào input

    useEffect(() => {
        setRevenue(revenue);
        setExpData(expected);
        setTypeData(type);
        const percentage = (revenue / expected) * 100;
        if (percentage > 100) {
            const exceedPercentage = (percentage - 100).toFixed(1);
            setExceedMessage(`Vượt ${exceedPercentage}%`);
            setExceedMessageShown(false);
        } else {
            setExceedMessage(null);
            setExceedMessageShown(true);
        }
    }, [revenue, expected, type]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleOkClick = () => {
        const value = parseFloat(inputValue);
        if (!isNaN(value)) {
            setExpData(value);
            console.log("New expected value:", value);
            const percentage = (revenue / value) * 100;
            if (percentage > 100) {
                const exceedPercentage = (percentage - 100).toFixed(1);
                setExceedMessage(`Vượt ${exceedPercentage}%`);
                setExceedMessageShown(false);
            } else {
                setExceedMessage(null);
                setExceedMessageShown(true);
            }
        }
    };

    return (
        <div className='featured'>
            {typeData === 'revenueToday' && (
                <>
                    <div className="top">
                        <h1 className="title">Tổng doanh thu</h1>
                        <MoreVertIcon fontSize="small" className="icon" />
                    </div>
                    <div className="bottom">
                        <div className="featuredChart">
                            <CircularProgressbar value={revenueData ? revenueData / expData * 100 : 0}
                                text={exceedMessageShown ? `${revenueData ? (revenueData / expData * 100).toFixed(1) : 0}%` : ''}
                                strokeWidth={5} />
                            {exceedMessage && !exceedMessageShown && (
                                <p className="exceedMessage">{exceedMessage}</p>
                            )}
                        </div>
                        <p className="title">Tổng doanh thu hôm nay</p>
                        <p className="amount">{revenueData ? `${revenueData} đ` : '$0'}</p>
                    </div>
                </>
            )}
            {typeData === 'totalProToday' && (
                <>
                    <div className="top">
                        <h1 className="title">Tổng suất bán </h1>
                        <MoreVertIcon fontSize="small" className="icon" />
                    </div>
                    <div className="bottom">
                        <div className="featuredChart">
                            <CircularProgressbar value={revenueData ? (revenueData / expData * 100).toFixed(1) : 0}
                                text={exceedMessageShown ? `${revenueData ? (revenueData / expData * 100).toFixed(1) : 0}%` : ''}
                                strokeWidth={5} />
                            {exceedMessage && !exceedMessageShown && (
                                <p className="exceedMessage">{exceedMessage}</p>
                            )}
                        </div>
                        <p className="title">Tổng suất bán hôm nay</p>
                        <p className="amount">{revenueData ? `${revenueData} suất` : '$0'}</p>
                    </div>
                </>
            )}
            <div className="input-container">
                <p className="desc">Mục tiêu hôm nay</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <p className="desc">  {typeData === 'totalProToday' ? 'suất' : 'đ'}</p>
                </div>
                <button onClick={handleOkClick}>Ok</button>
            </div>
        </div>
    )
}
export default Featured;