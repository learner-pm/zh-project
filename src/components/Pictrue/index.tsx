import { Card, Slider } from "antd";
import "./index.css";
const Pictrue: React.FC = () => {
  return (
    <div className="pictrue">
      <h1>图片 - Pictrue</h1>
      <div className="pictrue_content">
        <div className="pictrue_content_left">
          <div className="pictrue_now"></div>
          <div className="pictrue_old">
            <div className="pictrue_old_item"></div>
          </div>
        </div>
        <div className="pictrue_content_right">
          <Card
            title="可选参数"
            bordered={false}
            style={{
              width: "100%",
              textAlign: "left",
            }}
          >
            <div className="params">
              <p>美白 ：</p> <Slider defaultValue={30} tooltip={{ open: true }} />
            </div>
            <div className="params">
              廋脸 ： <Slider defaultValue={30} tooltip={{ open: true }} />
            </div>
            <div className="params">
              磨皮 ： <Slider defaultValue={30} tooltip={{ open: true }} />
            </div>
            <div className="params">
              大眼 ： <Slider defaultValue={30} tooltip={{ open: true }} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pictrue;
