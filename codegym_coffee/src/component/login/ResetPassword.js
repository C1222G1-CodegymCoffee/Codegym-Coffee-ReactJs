import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { postResetPassword } from "../../service/Service";

function ResetPassword() {
  let param = useParams();
  const navigate = useNavigate();
  let res = document.cookie;
  let arr = res.split("=");
  
  console.log(arr[1]);
  return (
    <div className="container">
      <div className="form-reset-password bg-secondary br-10">
        <h1 className="text-center my-4 text-white">Lập lại mật khẩu</h1>
        <Formik
              initialValues={{
                  token: arr[1],
                  password: ""
              }}

              

              onSubmit={(values) => {
                const login = async () => {
                  const a = await postResetPassword(values);
                  console.log(a);
                  console.log(values);
                  navigate('/login');
              }
              login();
              }}
        >
              {
                  <Form className="">
                  <div className="mb-3">
                      <Field
                      type="password"
                      className="form-control"
                      placeholder="Nhập mật khẩu mới"
                      name="password"
                      />
                      {/* <div id="emailHelp" className="form-text text-danger fs-15">Trường này không được để trống</div> */}
                  </div>
                  <div className="mb-3 input-group">
                      <Field
                      type="password"
                      className="form-control form-pw"
                      placeholder="Xác nhận mật khẩu"
                      name="password"
                      />
                      <i className="bi bi-eye-slash float-end icon-custom"></i>
                  <div id="emailHelp" className="form-text text-danger col-12 fs-15">Trường này không được để trống</div>
                  </div>
                  <button type="submit" className="col-12 button my-4">
                      Đổi mật khẩu
                  </button>
              </Form>
              }
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;