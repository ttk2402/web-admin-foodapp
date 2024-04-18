
import "./tabs.css"
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
// import DataTableStaffMngt from "../../../components/dataTableStaffMngt/dataTableStaffMngt";


// import "./datatableStaffMngt.css";


//


//data
// import { staffMngtColumns, staffMngtRows } from "../../data/dataStaffMngt";


import { Link } from "react-router-dom";
import VD from "../../../components/dataTableStaffMngt/VD";





// import DataTableStaffMngt from "../../../components/dataTableStaffMngt/dataTableStaffMngt";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

// SonDN fixed - Active size wrong size on first load.
// Original post: https://www.facebook.com/groups/649972919142215/?multi_permalinks=1175881616551340
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


const Tabs0 = () => {





    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar title="Quản lý nhân viên" />
                {/* <DataTableStaffMngt /> */}





                <Link to="/staffManagement/addStaff" style={{ textDecoration: "none" }}>
                    <div className="link">Thêm nhân viên</div>
                </Link>

                <div>


                    <div class="tabs">

                        <div class="tab-item active">
                            <i class="tab-icon fas fa-code"></i>
                            React
                        </div>
                        <div class="tab-item">
                            <i class="tab-icon fas fa-cog"></i>
                            Angular
                        </div>
                        <div class="tab-item">
                            <i class="tab-icon fas fa-plus-circle"></i>
                            Ember
                        </div>
                        <div class="tab-item">
                            <i class="tab-icon fas fa-pen-nib"></i>
                            Vue.JS
                        </div>

                        <div class="line"></div>



                    </div>

                    {/* <!-- Tab content --> */}
                    <div class="tab-content">
                        <div class="tab-pane active">

                            {/* <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p> */}
                            <VD />
                        </div>
                        <div class="tab-pane">
                            <h2>Angular</h2>
                            <p>Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.</p>
                        </div>
                        <div class="tab-pane">
                            <h2>Ember</h2>
                            <p>Ember.js is a productive, battle-tested JavaScript framework for building modern web applications. It includes everything you need to build rich UIs that work on any device.</p>
                        </div>
                        <div class="tab-pane">
                            <h2>Vue.js</h2>
                            <p>Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Tabs0