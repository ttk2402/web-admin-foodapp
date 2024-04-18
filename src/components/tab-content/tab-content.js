import React from "react";
import "./tab-content.css";

export default class TabContent extends React.Component {
  constructor(props) {
    super(props);
    // Tạo ra một mảng để lưu ref của các tab content
    this.refTabContents = [];
    this.props.input.forEach((_) => {
      this.refTabContents.push(React.createRef());
    });
    // Mặc định sẽ hiển thị tab đầu tiên, nên this.state.tabIndex = 0
    this.state = {
      tabIndex: 0,
    };
    this.changeTabIndex = this.changeTabIndex.bind(this);
    this.updateTabContent = this.updateTabContent.bind(this);
  }
  changeTabIndex(index) {
    this.setState({
      tabIndex: index,
    });
  }
  updateTabContent() {
    this.refTabContents.forEach((refTab, index) => {
      const elmTab = refTab.current;

      if (this.state.tabIndex === index) {
        elmTab.style.maxHeight = 630 + "px";
        elmTab.style.opacity = "1";
      } else {
        elmTab.style.maxHeight = null;
        elmTab.style.opacity = "0";
      }
    });
  }
  componentDidMount() {
    this.updateTabContent();
    window.addEventListener("resize", this.updateTabContent);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateTabContent);
  }
  componentDidUpdate() {
    this.updateTabContent();
  }

  render() {
    return (
      <div className="lp-tab-content">
        <div className="tab">
          {this.props.input.map((tabContent, index) => {
            return (
              <button
                key={index}
                className={`tab-link ${this.state.tabIndex === index ? "active" : ""
                  }`}
                onClick={() => this.changeTabIndex(index)}
              >
                {tabContent.title}
              </button>
            );
          })}
        </div>
        <div className="tab-content-wrapper">
          {this.props.input.map((tabContent, index) => {
            return (
              <div
                ref={this.refTabContents[index]}
                key={index}
                className={`tab-content`}
              >
                {tabContent.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}