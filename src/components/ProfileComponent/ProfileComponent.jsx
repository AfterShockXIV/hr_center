import React, { useState, useEffect, useRef } from "react";
import ReactRelationGraph from "react-relation-graph";
import { Canvas } from "reaflow";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import swal from "sweetalert";
import axios from "axios";
import UrlServer from "Configs/PortServer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const ProfileComponent = (props) => {
  //================ Edit ==============
  const name_department = localStorage.getItem("name_department");
  const form = useRef();
  const [open_approve, setOpen_approve] = useState(false);
  const handleOpen_approve = () => setOpen_approve(true);
  const handleClose_approve = () => {
    setOpen_approve(false);
  };

  //======= ID Dynamic ====================================
  const [id_section, setID_section] = useState("");
  const [id_department, setID_department] = useState("");
  const [id_position, setID_position] = useState("");

  //================เก็บค่าจาก API =====================
  const [hr_section, setHr_section] = useState([]);
  const [hr_department, setHr_department] = useState([]);
  const [hr_position, setHr_position] = useState([]);
  const [data_all, setData_all] = useState([]);

  //================== file ==============
  const local_hr_run_id = localStorage.getItem("hr_run_id");
  //=================== onSubmit_input_form ==============

  //=========== type file_img=========

  //============== dynamic_section=================
  useEffect(() => {
    fetch(`${UrlServer}/apis/get/allempedit/${local_hr_run_id}`)
      .then((response) => response.json())
      .then((result) => setData_all(result))
      .catch((Error) => Error);
  }, [local_hr_run_id]);

  //============== dynamic_section=================
  useEffect(() => {
    fetch(`${UrlServer}/apis/dynamic/dynamic_section`)
      .then((response) => response.json())
      .then((result) => setHr_section(result))
      .catch((Error) => Error);
  }, []);
  //========== dynamic_dapartment==============
  useEffect(() => {
    fetch(`${UrlServer}/apis/dynamic/dynamic_departmet/${id_section}`)
      .then((response) => response.json())
      .then((result) => setHr_department(result))
      .catch((Error) => Error);
  }, [id_section]);

  //========== dynamic_position ==============
  useEffect(() => {
    fetch(`${UrlServer}/apis/dynamic/dynamic_position/${id_department}`)
      .then((response) => response.json())
      .then((result) => setHr_position(result))
      .catch((Error) => Error);
  }, [id_department]);

  const Set_edit = async () => {
    if (data_all.hr_emp === "รายเดือน") {
      document.getElementById("cat_1").checked = true;
    } else if (data_all.hr_emp === "รายวัน") {
      document.getElementById("cat_2").checked = true;
    } else if (data_all.hr_emp === "ผู้อำนวยการ") {
      document.getElementById("cat_3").checked = true;
    } else if (data_all.hr_emp === "ผู้จัดการ") {
      document.getElementById("cat_4").checked = true;
      // document.getElementById("po").style.visibility = "hidden";
      // document.getElementById("label_po").style.visibility = "hidden";
    } else if (data_all.hr_emp === "ผู้ช่วยผู้จัดการ") {
      document.getElementById("asst").checked = true;
    }
    //สถานะการทำงาน

    if (data_all.status_emp === "ทำงานอยู่") {
      document.getElementById("cat_5").checked = true;
      document.getElementById("check_date_out").style.display = "none";
      document.getElementById("label_check_date_out").style.display = "none";
      document.getElementById("check_date_out").required = false;
    } else if (data_all.status_emp === "ลาออก") {
      document.getElementById("cat_6").checked = true;
    }
  };
  //=========== return ==========================

  // ใส่ name ให้กับ type
  // image,hr_employeeid,number_emp,hr_job_start,hr_employeename,hr_surname,hr_employee_eng,hr_lastname_eng,hr_nickname,birthday_emp,hr_phone,id_section,id_department,id_position,cat_em,hr_email_user,work,job_out,Password,

  return (
    <>
      <div className="content" onLoad={Set_edit()}>
        <div style={{ overflow: "scroll", width: "100%" }}>
          <Canvas
            maxWidth={2500}
            maxHeight={1000}
            nodes={[
              {
                id: "1",
                text: "ผอ.",
              },
              {
                id: "2",
                text: "ผจก.DTM",
              },
              {
                id: "3",
                text: "ผจก.ECM",
              },
              {
                id: "4",
                text: "ผช.DTM",
              },
              {
                id: "5",
                text: "ผช.ECM",
              },
              {
                id: "6",
                text: `แผนก Information Technology`, //\nหัวหน้าแผนก (Supervisor)
              },
              {
                id: "7",
                text: `แผนก Software Development`, //\nหัวหน้าแผนก (Supervisor)
              },
              {
                id: "8",
                text: "แผนก Online Platform",
              },
              {
                id: "9",
                text: `หัวหน้าแผนก (Supervisor)`, //\nหัวหน้าแผนก (Supervisor)
              },
              {
                id: "10",
                text: `หัวหน้าแผนก (Supervisor)`, //\nหัวหน้าแผนก (Supervisor)
              },
              {
                id: "11",
                text: "หัวหน้าแผนก (Supervisor)",
              },
              {
                id: "12",
                text: "Security & Admin System",
              },
              {
                id: "13",
                text: "IT Technician & Network",
              },
              {
                id: "14",
                text: "IT Support",
              },
              {
                id: "15",
                text: "Electrical Engineer",
              },
              {
                id: "16",
                text: "ABAPER SAP",
              },
              {
                id: "17",
                text: "SAP Functional",
              },
              {
                id: "18",
                text: "Web & App Programmer",
              },
              {
                id: "19",
                text: "Web & App Programmer ",
              },
              {
                id: "20",
                text: "Functional  Platform",
              },
              {
                id: "21",
                text: "Marketing Technologist",
              },
            ]}
            edges={[
              {
                id: "1-2",
                from: "1",
                to: "2",
              },
              {
                id: "1-3",
                from: "1",
                to: "3",
              },
              {
                id: "2-4",
                from: "2",
                to: "4",
              },
              {
                id: "3-5",
                from: "3",
                to: "5",
              },
              {
                id: "4-6",
                from: "4",
                to: "6",
              },
              {
                id: "4-7",
                from: "4",
                to: "7",
              },
              {
                id: "5-8",
                from: "5",
                to: "8",
              },
              {
                id: "6-9",
                from: "6",
                to: "9",
              },
              {
                id: "7-10",
                from: "7",
                to: "10",
              },
              {
                id: "8-11",
                from: "8",
                to: "11",
              },
              {
                id: "9-12",
                from: "9",
                to: "12",
              },
              {
                id: "9-13",
                from: "9",
                to: "13",
              },
              {
                id: "9-14",
                from: "9",
                to: "14",
              },
              {
                id: "9-15",
                from: "9",
                to: "15",
              },
              {
                id: "10-16",
                from: "10",
                to: "16",
              },
              {
                id: "10-17",
                from: "10",
                to: "17",
              },
              {
                id: "10-18",
                from: "10",
                to: "18",
              },
              {
                id: "11-19",
                from: "11",
                to: "19",
              },
              {
                id: "11-20",
                from: "11",
                to: "20",
              },
              {
                id: "11-21",
                from: "11",
                to: "21",
              },
            ]}
          />
        </div>
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">แก้ไขข้อมูลพนักงาน</h5>
              </CardHeader>
              <CardBody>
                <form onSubmit={Set_edit()}>
                  <Row>
                    <Col sm="12" className="ImgCenter">
                      <br />
                      <a
                        target="_blank"
                        href={`${UrlServer}/IMG_EMP/${data_all.hr_employee_img}`}
                        rel="noreferrer"
                      >
                        <img
                          src={`${UrlServer}/IMG_EMP/${data_all.hr_employee_img}`}
                          alt=""
                          style={{
                            height: "150px",
                            width: "150px",
                            marginBottom: "10px",
                          }}
                        />
                      </a>
                      <br></br>

                      <br />
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label> รหัสพนักงาน</label>
                        <Input
                          disabled
                          id="id_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          name="hr_employeeid"
                          defaultValue={data_all.hr_employeeid}
                          placeholder="รหัสพนักงาน"
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label> เลขเครื่องสแกนนิ้ว</label>
                        <Input
                          disabled
                          id="num_emp"
                          type="text"
                          name="number_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          placeholder="Num_Employee"
                          defaultValue={data_all.number_emp}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>วันเข้างาน</label>
                        <Input
                          disabled
                          id="date_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="date"
                          name="hr_job_start"
                          defaultValue={data_all.hr_job_start}
                          placeholder="วันเข้างาน"
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> ชื่อ</label>
                        <Input
                          disabled
                          id="name_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          name="hr_employeename"
                          placeholder="ชื่อ(ภาษาไทย)"
                          defaultValue={data_all.hr_employeename}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> นามสกุล</label>
                        <Input
                          disabled
                          id="surname_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          name="hr_surname"
                          placeholder="นามสกุล"
                          defaultValue={data_all.hr_surname}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label>First Name</label>
                        <Input
                          disabled
                          id="first_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          name="hr_employee_eng"
                          placeholder="name"
                          defaultValue={data_all.hr_employee_eng}
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> Last Name</label>
                        <Input
                          disabled
                          id="last_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          name="hr_lastname_eng"
                          placeholder="lastname"
                          defaultValue={data_all.hr_lastname_eng}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <label> ชื่อเล่น</label>
                        <Input
                          disabled
                          id="nickname_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="text"
                          name="hr_nickname"
                          placeholder="Nickname"
                          defaultValue={data_all.hr_nickname}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label>วัน/เดือน/ปีเกิด</label>
                        <Input
                          disabled
                          id="birthday"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="date"
                          name="birthday_emp"
                          defaultValue={data_all.birthday_emp}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>เบอร์โทรศัพท์</label>
                        <Input
                          disabled
                          id="tel_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="tel"
                          name="hr_phone"
                          placeholder="Phone"
                          defaultValue={data_all.hr_phone}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <FormGroup>
                        <label>สายงาน</label>
                        <Input
                          disabled
                          id="section_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="select"
                          name="id_section"
                          onChange={(e) => setID_section(e.target.value)}
                        >
                          <option checked value={data_all.id}>
                            {data_all.eng_section}
                          </option>
                          {hr_section.map((data) => {
                            return (
                              <option value={data.id_section}>
                                {data.eng_section}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col sm="4">
                      <FormGroup>
                        <label id="label_de">ฝ่าย</label>
                        <Input
                          disabled
                          id="de"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ececf0",
                            color: "red",
                          }}
                          type="select"
                          name="id_department"
                          onChange={(e) => setID_department(e.target.value)}
                        >
                          {" "}
                          <option checked value={data_all.id_department}>
                            {data_all.eng_department}
                          </option>
                          {hr_department.map((data) => {
                            return (
                              <option value={data.id_department}>
                                {data.eng_department}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col sm="4">
                      <FormGroup>
                        <label id="label_po">ตำแหน่ง</label>
                        <Input
                          disabled
                          id="po"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ececf0",
                            color: "red",
                          }}
                          type="select"
                          name="id_position"
                          defaultValue={hr_position}
                        >
                          {" "}
                          <option checked value={data_all.id_position}>
                            {data_all.eng_position}
                          </option>
                          {hr_position.map((data) => {
                            return (
                              <option value={data.id_position}>
                                {data.eng_position}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label>พนักงาน</label>
                        <br />
                        <div>
                          <div style={{ paddingLeft: "30px" }}>
                            <Input
                              disabled
                              id="cat_1"
                              type="radio"
                              value="รายเดือน"
                              name="cat_em"
                            />
                            <label>รายเดือน</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              disabled
                              id="cat_2"
                              type="radio"
                              value="รายวัน"
                              name="cat_em"
                            />
                            <label>รายวัน</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              disabled
                              id="cat_3"
                              type="radio"
                              value="ผู้อำนวยการ"
                              name="cat_em"
                            />
                            <label>ผู้อำนวยการ</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              disabled
                              id="cat_4"
                              type="radio"
                              value="ผู้จัดการ"
                              name="cat_em"
                            />
                            <label>ผู้จัดการ</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              disabled
                              id="asst"
                              type="radio"
                              value="ผู้ช่วยผู้จัดการ"
                              name="cat_em"
                            />
                            <label>ผู้ช่วยผู้จัดการ</label>
                          </div>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label> E-mail</label>
                        <Input
                          disabled
                          id="mail_emp"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          type="email"
                          name="hr_email_user"
                          placeholder="Email"
                          defaultValue={data_all.hr_email_user}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <label> สถานะการทำงาน</label>
                        <div style={{ paddingLeft: "30px" }}>
                          <Input
                            disabled
                            id="cat_5"
                            type="radio"
                            value="ทำงานอยู่"
                            name="work"
                          />
                          <label id="label_job"> ทำงานอยู่ </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                            disabled
                            id="cat_6"
                            type="radio"
                            value="ลาออก"
                            name="work"
                          />
                          <label>ลาออก</label>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <label style={{ color: "red" }} id="label_check_date_out">
                        วันที่ออก
                      </label>
                      <Input
                        disabled
                        type="date"
                        size="md"
                        style={{
                          color: "red",
                          backgroundColor: "#ebecf0",
                        }}
                        id="check_date_out"
                        name="job_out"
                        defaultValue={data_all.job_out}
                      ></Input>
                    </Col>

                    <Col sm="6">
                      <FormGroup>
                        <label> รหัสผ่าน</label>
                        <Input
                          disabled
                          id="pass"
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                            color: "red",
                          }}
                          //type="password"

                          name="hr_password"
                          defaultValue={data_all.hr_password}
                          placeholder="Password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileComponent;
