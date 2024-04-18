
import "./tabs.css"
// import Navbar from '../../../components/navbar/Navbar';
// import Sidebar from '../../../components/sidebar/Sidebar';
// import DataTableStaffMngt from "../../../components/dataTableStaffMngt/dataTableStaffMngt";


// import "./datatableStaffMngt.css";


//


//data
// import { staffMngtColumns, staffMngtRows } from "../../data/dataStaffMngt";


// import { Link } from "react-router-dom";
import VD from "../../../components/dataTableStaffMngt/VD";





// import DataTableStaffMngt from "../../../components/dataTableStaffMngt/dataTableStaffMngt";

// const tabActive = $(".tab-item.active");
// const line = $(".tabs .line");

// requestIdleCallback(function () {
//     line.style.left = tabActive.offsetLeft + "px";
//     line.style.width = tabActive.offsetWidth + "px";
// });

// tabs.forEach((tab, index) => {
//     const pane = panes[index];

//     tab.onclick = function () {
//         $(".tab-item.active").classList.remove("active");
//         $(".tab-pane.active").classList.remove("active");

//         line.style.left = this.offsetLeft + "px";
//         line.style.width = this.offsetWidth + "px";

//         this.classList.add("active");
//         pane.classList.add("active");
//     };
// });
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");
requestIdleCallback(function () {
    line.style.left = tabActive.offsetLeft + "px";
    line.style.width = tabActive.offsetWidth + "px";
});

tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
        pane.classList.add("active");
    };
});


const Tab = () => {

    // const $ = document.querySelector.bind(document);
    // const $$ = document.querySelectorAll.bind(document);

    // const tabs = $$(".tab-item");
    // const panes = $$(".tab-pane");


    // tabs.forEach((tab, index) => {
    //     tab.onclick = function () {
    //         console.log(this)
    //     }
    // })




    return (
        // <div className='list'>
        //     <Sidebar />
        //     <div className="listContainer">
        //         <Navbar title="Quản lý nhân viên" />
        //         {/* <DataTableStaffMngt /> */}















        <div >


            <div className="tabs">

                <div className="tab-item active">
                    <i className="tab-icon fas fa-code"></i>
                    React
                </div>
                <div className="tab-item">
                    <i className="tab-icon fas fa-cog"></i>
                    Angular
                </div>
                <div className="tab-item">
                    <i className="tab-icon fas fa-plus-circle"></i>
                    Ember
                </div>
                <div className="tab-item">
                    <i className="tab-icon fas fa-pen-nib"></i>
                    Vue.JS
                </div>

                <div className="line"></div>



            </div>

            {/* <!-- Tab content --> */}
            <div className="tab-content">
                <div className="tab-pane active">

                    {/* <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p> */}
                    <VD />
                </div>
                <div className="tab-pane">
                    <h2>Angular</h2>
                    <p>Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.</p>
                </div>
                <div className="tab-pane">
                    <h2>Ember</h2>
                    <p>Ember.js is a productive, battle-tested JavaScript framework for building modern web applications. It includes everything you need to build rich UIs that work on any device.</p>
                </div>
                <div className="tab-pane">
                    <h2>Vue.js</h2>
                    <p>Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. </p>
                </div>
            </div>
        </div>
        //     </div>


        // </div>

    )
}

export default Tab