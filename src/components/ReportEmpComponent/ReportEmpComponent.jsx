import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Card, CardBody } from "reactstrap";
import UrlServer from "Configs/PortServer";
export default function ReportEmpComponent() {
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_status, setData_status] = useState([]);

  useEffect(() => {
    fetch(`${UrlServer}/apis/get/allemp`)
      .then((response) => response.json())
      .then((result) => setData_status(result))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  const name_department = localStorage.getItem("name_department");
  const row = [];
  data_status.forEach((data, key) => {
    row.push({
      btn_ed: (() => {
          return (
            <div>
              <a href={"/web/edit_emp/" + data.hr_run_id}>
                <button type="button" className="button">
                  EDIT
                </button>
              </a>
            </div>
          );
      })(),
      //<div className="button"><button onClick={() => check_edit(data.hr_employeename,data.hr_surname)}>แก้ไข</button></div>,
      // image:<img src={'http://localhost:4000/'+data.hr_em0ployee_img} alt="" style={{height:"60px",width:"60px"}}/>,
      empname: data.hr_employeename,
      surname: data.hr_surname,
      department: data.eng_department,
      section: data.eng_section,
      // nickname:data.hr_nickname,
      name_section: data.name_section,
      position: data.eng_position,
      //job_start:data.hr_job_start,
      phone: data.hr_phone,
      birthday: data.birthday_emp,

      status_emp: (() => {
        if (data.status_emp === "ทำงานอยู่") {
          return (
            <div className="">
              <span style={{ fontSize: "12px" }} class="badge badge-success">
                ทำงานอยู่{" "}
              </span>
            </div>
          );
        } else if (data.status_emp === "ลาออก") {
          return (
            <span style={{ fontSize: "12px" }} class="badge badge-danger">
              ลาออก
            </span>
          );
        }
      })(),
      mail: data.hr_email_user,
    });
  });
  const datatable = {
    columns: [
      {
        label: "แก้ไขข้อมูล",
        field: "btn_ed",
        width: 150,
      },
      {
        label: "Approve",
        field: "approve",
        width: 150,
      },
      {
        label: "สถานะการทำงาน",
        field: "status_emp",
        width: 150,
      },
      {
        label: "ชื่อ",
        field: "empname",
        width: 150,
      },
      {
        label: "นามสกุล",
        field: "surname",
        width: 150,
      },
      {
        label: "วัน/เดือน/ปีเกิด",
        field: "birthday",
        width: 150,
      },
      // {
      //   label: "ชื่อเล่น",
      //   field: "nickname",
      //   width: 100,
      // },
      {
        label: "อักษรย่อ",
        field: "name_section",
        width: 150,
      },
      {
        label: "สายงาน",
        field: "section",
        width: 150,
      },
      {
        label: "ฝ่าย",
        field: "department",
        width: 150,
      },
      {
        label: "ตำแหน่ง",
        field: "position",
        width: 150,
      },
      // {
      //   label: "วันที่เริ่มงาน",
      //   field: "job_start",
      //   width: 100,
      // },
      {
        label: "Email",
        field: "mail",
        width: 150,
      },
      {
        label: "เบอร์โทรศัพท์",
        field: "phone",
        width: 150,
      },
    ],
    rows: row,
  };

  return (
    <>
      <div className="content">
        <Card>
          <CardBody>
            <MDBDataTableV5
              //striped
              hover
              entriesOptions={[5, 10, 20, 25]}
              entries={5}
              pagesAmount={4}
              scrollX
              data={datatable}
              searchTop
              searchBottom={false}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
