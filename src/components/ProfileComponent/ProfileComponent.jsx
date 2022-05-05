import React, { useState, useEffect} from "react";
import {
  Row,
  Col,
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import axios from "axios";
import UrlServer from "Configs/PortServer";

const ProfileComponent = (props) => {
  //================ Edit ==============

  //======= ID Dynamic ====================================
  const [id_section, setID_section] = useState("");
  const [id_department, setID_department] = useState("");

  //================เก็บค่าจาก API =====================
  const [hr_section, setHr_section] = useState([]);
  const [hr_department, setHr_department] = useState([]);
  const [hr_position, setHr_position] = useState([]);
  const [data_all, setData_all] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [OlefileName, setOleFileName] = useState("");
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

  //=========== type file_img=========

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setOleFileName(data_all.hr_employee_img);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("hr_run_id", local_hr_run_id);
    formData.append("OlefileName", OlefileName);
    try {
      const res = await axios.post(
        `${UrlServer}/apis/post/update_img_emp_edit`,
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  
  // ใส่ name ให้กับ type
  // image,hr_employeeid,number_emp,hr_job_start,hr_employeename,hr_surname,hr_employee_eng,hr_lastname_eng,hr_nickname,birthday_emp,hr_phone,id_section,id_department,id_position,cat_em,hr_email_user,work,job_out,Password,

  return (
    <>
      <div className="content" onLoad={Set_edit()}>
       
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">Profile</h5>
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
                   
                      <input
                        className="InputFile"
                        id="img_emp"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={saveFile}
                      />
                        <Button
                          id="btn_submit"
                          type="submit"
                          style={{
                            backgroundColor: "#ff3636",
                            fontSize: "12.5px",
                            fontWeight: "bolder",
                          }}
                          onClick={uploadFile}
                        >
                          บันทึกรููป
                        </Button>
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
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                            <label>ผู้ช่วยผู้จัดการ</label> */}
                          </div>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label>Address E-mail</label>
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
                        <label>รหัสผ่านของเว็บ</label>
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
