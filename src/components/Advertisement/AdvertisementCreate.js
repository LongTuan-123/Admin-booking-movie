import { Button, Form, Input } from 'antd'
import PrivateLayout from '../../Layout/PrivateLayout'
import { API_ADVERTISEMENT_STORE } from '../../config/endpointapi'
import { ADVERTISEMENT } from '../../config/path'
import { useHistory } from 'react-router-dom'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import moment from 'moment'

const AdvertisementCreate = () => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  const onCreateAdvertisement = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_ADVERTISEMENT_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['advertisement'])
          // toast.success(res?.message)
          setTimeout(() => {
            history.push(ADVERTISEMENT)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <Form name="validate_other" {...formItemLayout} onFinish={onCreateAdvertisement}>
        <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>Add Advertisement</h2>

        <Form.Item
          {...formItemLayout}
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Input the name ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: 'Chose image URL',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </PrivateLayout>
  )
}
export default AdvertisementCreate
