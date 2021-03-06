import PrivateLayout from "../../Layout/PrivateLayout";
import { Form, Select, InputNumber, Button, Input, DatePicker } from "antd";
import axios from "axios";
import { API_MOVIE_DETAIL, API_MOVIE_UPDATE } from "../../config/endpointapi";
import { useEffect, useState } from "react";
import Cookies from "cookies-js";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { MOVIE } from "../../config/path";
import { useParams } from "react-router-dom";
import { bindParam } from "../../config/function";
import { getToken } from "../../Http";

const { Option } = Select;

const MovieUpdate = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const [defaultValue, setDefaultValue] = useState({});
  const history = useHistory();

  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    await axios
      .get(bindParam(API_MOVIE_DETAIL, { id }))
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
        range_of_movie: data?.range_of_movie,
        start_date: moment(data?.start_date),
        dimension: data?.dimension,
        type_of_movie: data?.type_of_movie?.split(","),
        range_age: data?.range_age,
        actor: data?.actor,
        direct: data?.director,
        description: data?.description,
        poster: data?.poster,
        trailer: data?.trailer,
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
    const { type_of_movie, start_date } = values;

    if (id) {
      values.id = Number(id);
    }
    if (type_of_movie) {
      values.type_of_movie = type_of_movie.toString();
    }
    if (start_date) {
      values.start_date = moment(start_date).format("YYYY-MM-DD");
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    axios
      .post(API_MOVIE_UPDATE, values)
      .then(function (res) {
        history.push(MOVIE);
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
          s???a phim
        </h2>

        <Form.Item
          {...formItemLayout}
          name="name"
          label="T??n phim"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input placeholder="Nh???p t??n b??? phim" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="range_of_movie"
          label="Th???i l?????ng"
          rules={[
            {
              required: true,
              message: "Nh???p th???i l?????ng phim",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="start_date"
          label="Th???i gian kh???i chi???u"
          rules={[
            {
              required: true,
              message: "Nh???p th???i gian kh???i chi???u",
            },
          ]}
        >
          <DatePicker style={{ width: "70%" }} />
        </Form.Item>
        <Form.Item
          name="dimension"
          label="Lo???i phim"
          hasFeedback
          rules={[{ required: true, message: "Nh???p lo???i phim" }]}
        >
          <Select placeholder="Lo???i phim">
            <Option value="2D">2D</Option>
            <Option value="3D">3D</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="type_of_movie"
          label="Th??? lo???i"
          rules={[
            {
              required: true,
              message: "Nh???p th??? lo???i phim",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select favourite colors">
            <Option value="Kinh d???">Kinh d???</Option>
            <Option value="H??nh ?????ng">H??nh ?????ng</Option>
            <Option value="H??i h?????c">H??i h?????c</Option>
            <Option value="Ho???t h??nh">Ho???t h??nh</Option>
            <Option value="Trinh th??m">Trinh th??m</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Gi???i h???n tu???i">
          <Form.Item name="range_age" noStyle>
            <InputNumber min={0} max={21} />
          </Form.Item>
          <span className="ant-form-text"> tu???i</span>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="actor"
          label="Di???n vi??n"
          rules={[
            {
              required: true,
              message: "Nh???p t??n di???n vi??n",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="direct"
          label="?????o di???n"
          rules={[
            {
              required: true,
              message: "PNh???p t??n ?????o di???n",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="M?? t???"
          rules={[{ required: true, message: "Nh???p m?? t???" }]}
        >
          <Input.TextArea rows={5} showCount maxLength={1000} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="poster"
          label="Poster"
          rules={[
            {
              required: true,
              message: "Nh???p ???nh",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="trailer"
          label="Trailer"
          rules={[
            {
              required: true,
              message: "Nh???p link trailer",
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
export default MovieUpdate;
