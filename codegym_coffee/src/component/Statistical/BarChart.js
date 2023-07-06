import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { findAllSum } from "../../service/statistical/StatisticalService";
import "../../css/News/Statistical.css";
import { Formik, Form, Field } from "formik";
import AdminLayout from "../../layout/AdminLayout";

function ChartExample() {
  const [data1, setData1] = useState(null);

  return (
    <AdminLayout>
      <div id="abc">
        <div className="form-container">
          <h1 className="custom-header">Quản lí thu nhập</h1>

          <Formik
            initialValues={{
              dateAfter: "",
              dateBefore: "",
            }}
            onSubmit={async (values) => {
              try {
                let res = await findAllSum(values.dateAfter, values.dateBefore);
                setData1(res.data);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <Form>
              <div className="form-row">
                <div className="form-group d-flex">
                  <label htmlFor="dateAfter" className="mr-2">
                    Từ ngày:
                  </label>
                  &nbsp;
                  <Field type="date" id="dateAfter" name="dateAfter" />
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="dateBefore" className="mr-2">
                    Đến ngày:
                  </label>
                  &nbsp;
                  <Field type="date" id="dateBefore" name="dateBefore" />
                </div>
                <button className="form-group " type="submit">
                  Tính thu nhập
                </button>
              </div>
            </Form>
          </Formik>
          {data1 ? (
            <ResponsiveContainer className="chart" height={360}>
              <BarChart
                width={600}
                height={360}
                data={data1}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="d-flex no-data" style={{color: "red"}}>Không có dữ liệu</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default ChartExample;
