import {
  Button,
  Card,
  Input,
  message,
  Select,
  Slider,
  Space,
  Upload,
  UploadProps,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.css";
import { useCallback, useEffect, useState } from "react";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import requst from "../../util/requst";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const options = [
  {
    value: 1,
    label: "白茶",
  },
  {
    value: 3,
    label: "初夏",
  },
  {
    value: 4,
    label: "东京",
  },
  {
    value: 6,
    label: "暖阳",
  },
  {
    value: 12,
    label: "心动",
  },
];

const beforeUpload = (file: RcFile) => {
  console.log(file);
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const root = "http://192.168.43.184:8081";

interface Props {
  onSet: (boolean: boolean) => void;
}

const Pictrue: React.FC<Props> = ({ onSet }) => {
  // old的
  const [url, setUrl] = useState("");
  // 处理后的
  const [img, setImg] = useState("");
  const [type, setType] = useState("renwu");
  const [imgList, setImgList] = useState<any[]>([]);
  const [whitening, setWhitening] = useState(0);
  const [smoothing, setSmoothing] = useState(0);
  const [faceLifting, setFaceLifting] = useState(0);
  const [eyeEnlarging, setEyeEnlarging] = useState(0);
  const [filterDegree, setFilterDegree] = useState(0);
  const [filterType, setfilterType] = useState(1) as any;
  const props: UploadProps = {
    name: "file",
    action: "http://api.pmthank.cn:5382/music/addMusic",
    method: "post",
    showUploadList: false,
    itemRender: undefined,
    onChange(info) {
      // const imgUrl = requst
      //   .get
      //   // `${root}/picture/beauty?image=${imgUrl}&url=&whitening=10&smoothing=10&faceLifting=10&eyeEnlarging=10`
      //   ();
      console.log(info);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        const norollUlr = `http://api.pmthank.cn/music/${info.file.name}`;
        console.log(norollUlr);
        setUrl(norollUlr);
        // setImgList([...imgList, norollUlr]);
        message.success(`${info.file.name} 图片上传成功`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (url) requestPictrue(true);
  }, [url, type]);

  const getAll = async () => {
    const res = await requst.get(`${root}/picture/picture?type=${type}`);
    setImgList(res.data);
  };
  useEffect(() => {
    if (!url) setUrl(imgList[0]?.url);
  }, [imgList, type]);

  useEffect(() => {
    getAll();
  }, [url, type]);

  const requestPictrue = async (flag: any, degree?: any) => {
    const renwu = `${root}/picture/beauty?image=&url=${url}&whitening=${whitening}&smoothing=${smoothing}&faceLifting=${faceLifting}&eyeEnlarging=${eyeEnlarging}&flag=${flag}`;
    const fj = `${root}/picture/filter?image=&url=${url}&filterDegree=${degree}&filterType=${filterType}&flag=${flag}`;
    const res = await requst.get(type === "renwu" ? renwu : fj);

    setImg(res.data.url);
  };

  const requestByLv = async () => {
    const res = await requst.get(`${root}`);
  };
  useEffect(() => {
    requestPictrue(false);
  }, [filterType]);
  // useEffect(()=>{
  //   const line = document.getElementById('pictrue_out_line')
  //   line?.addEventListener('')
  // },[])

  useEffect(() => {
    setUrl("");
    setImg("");
    setImgList([]);
    getAll();
  }, [type]);
  return (
    <div className="pictrue">
      <p className="h1">
        <p
          className="h1_p"
          onClick={() => {
            setType("renwu");
          }}
        >
          人脸美化
        </p>
        /
        <p
          className="h1_p"
          onClick={() => {
            setType("fengjing");
          }}
        >
          图片滤镜
        </p>
      </p>
      <div className="pictrue_content">
        <div className="pictrue_content_left">
          <div className="pictrue_out">
            <div>
              <p className="title">原图</p>
              <div className="pictrue_now">
                <img src={url} />
              </div>
            </div>
            <div
              style={{
                height: 300,
                width: 300,
              }}
            >
              <p className="title"> 处理后</p>
              <div className="pictrue_now">
                <img src={img} />
              </div>
            </div>
          </div>

          <div className="pictrue_old">
            {imgList?.map((e) => (
              <div
                className="pictrue_old_item"
                onClick={() => {
                  setUrl(e.url);
                  setImg(e.url);
                  setEyeEnlarging(0);
                  setFaceLifting(0);
                  setSmoothing(0);
                  setWhitening(0);
                }}
              >
                <img src={e.url} />
              </div>
            ))}
          </div>
        </div>
        <div className="pictrue_content_right">
          <Card
            title="可选参数"
            className="card"
            bordered={false}
            style={{
              width: "100%",
              textAlign: "left",
            }}
          >
            {type === "renwu" ? (
              <div>
                <div className="params">
                  美白 ：
                  <Slider
                    value={whitening}
                    onChange={(value) => {
                      setWhitening(value);
                    }}
                    onAfterChange={() => {
                      requestPictrue(false);
                    }}
                  />
                </div>
                <div className="params">
                  廋脸 ：
                  <Slider
                    value={faceLifting}
                    onChange={(value) => {
                      setFaceLifting(value);
                    }}
                    onAfterChange={() => {
                      requestPictrue(false);
                    }}
                  />
                </div>
                <div className="params">
                  磨皮 ：
                  <Slider
                    value={smoothing}
                    onChange={(value) => {
                      setSmoothing(value);
                    }}
                    onAfterChange={() => {
                      requestPictrue(false);
                    }}
                  />
                </div>
                <div className="params">
                  大眼 ：
                  <Slider
                    value={eyeEnlarging}
                    onChange={(value) => {
                      setEyeEnlarging(value);
                    }}
                    onAfterChange={() => {
                      requestPictrue(false);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="params">
                  滤镜 ：
                  <Slider
                    value={filterDegree}
                    onChange={(value) => {
                      setFilterDegree(value);
                    }}
                    onAfterChange={(e) => {
                      requestPictrue(false, e);
                    }}
                  />
                </div>
                <Select
                  defaultValue="白茶"
                  style={{ width: 120 }}
                  onChange={(e) => {
                    setfilterType(e);
                  }}
                  options={options}
                />
              </div>
            )}
          </Card>
          <div className="pictrue_button">
            <Space size={20}>
              {/* <Button type="primary">导出视频</Button> */}
              {/* <Input
                placeholder="请输入"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              ></Input> */}
              {/* <Button onClick={() => search()}>搜索</Button> */}
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </Space>
          </div>
        </div>
      </div>
      <Button onClick={() => onSet(false)} className="next-btn">
        下一站
      </Button>
    </div>
  );
};

export default Pictrue;
