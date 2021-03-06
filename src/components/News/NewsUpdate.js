import PrivateLayout from "../../Layout/PrivateLayout";
import { Form, Select, InputNumber, Button, Input, DatePicker } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "cookies-js";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { MOVIE, NEWS } from "../../config/path";
import { useParams } from "react-router-dom";
import { bindParam } from "../../config/function";
import { API_NEWS_DETAIL, API_NEWS_UPDATE } from "../../config/endpointapi";
import { getToken } from "../../Http";

const { Option } = Select;

const NewsUpdate = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const [defaultValue, setDefaultValue] = useState({});
  const history = useHistory();

  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    await axios
      .get(bindParam(API_NEWS_DETAIL, { id }))
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        image: data?.image,
        detail: data?.detail,
        description: data?.description,
      });
    }
  }, [data, form]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    getData();
  }, []);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const onFinish = (values) => {
    if (id) {
      values.id = Number(id);
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .post(API_NEWS_UPDATE, values)
      .then(function (res) {
        history.push(NEWS);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  console.log(data);
  return (
    <PrivateLayout>
      <Form
        name="validate_other"
        initialValues={data}
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
      >
        <h2 style={{ fontSize: "2rem", textTransform: "uppercase" }}>
          S???a tin t???c
        </h2>
        <Form.Item
          {...formItemLayout}
          name="name"
          label="Ti??u ????? tin t???c"
          rules={[
            {
              required: true,
              message: "??i???n ti??u ?????",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="image"
          label="???nh ti??u ?????"
          rules={[
            {
              required: true,
              message: "Nh???p th??ng tin ???nh",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="description"
          label="T??m t???t m?? t???"
          rules={[
            {
              required: true,
              message: "Nh???p t??m t???t m?? t???",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="detail"
          label="N???i dung chi ti???t"
          rules={[
            {
              required: true,
              message: "Nh???p n???i dung chi ti???t",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            X??c nh???n
          </Button>
        </Form.Item>
      </Form>
    </PrivateLayout>
  );
};
export default NewsUpdate;
