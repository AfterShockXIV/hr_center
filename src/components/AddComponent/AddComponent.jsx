import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import swal from "sweetalert";
import axios from "axios";
import { useEffect } from "react";
import UrlServer from "Configs/PortServer";

export default function AddComponent() {
  const [hr_employeeid, setHr_Employeeid] = useState("");
  const [hr_employeename, setHr_Employeename] = useState("");
  const [hr_surname, setHr_Employeesurname] = useState("");
  const [hr_nickname, setHr_Employeenickname] = useState("");
  const [hr_phone, setHr_Employeephone] = useState("");
  const [hr_job_start, setHr_Job_Start] = useState("");
  const [hr_email_user, setHr_Email_User] = useState("");
  const [hr_password, setHr_Password] = useState("");
  const [hr_employee_img, setHr_Eployee_Img] = useState("");
  const [hr_emp, setHr_Emp] = useState("");
  const [hr_employee_eng, setHr_Employee_eng] = useState("");
  const [hr_lastname_eng, setHr_Lastname_Eng] = useState("");
  const [number_emp, setNumber_emp] = useState("");
  const [birthday_emp, setBirthday_Emp] = useState("");

  //======= ID Dynamic ====================================
  const [id_section, setID_section] = useState("");
  const [id_department, setID_department] = useState("");
  const [id_position, setID_position] = useState("");

  //================เก็บค่าจาก API =====================
  const [hr_section, setHr_section] = useState([]);
  const [hr_department, setHr_department] = useState([]);
  const [hr_position, setHr_position] = useState([]);
 
  //================== file ==============
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");


 //=========== type file_img=========
 const saveFile = (e) => {
  setFile(e.target.files[0]);
  setFileName(e.target.files[0].name);
};
const uploadFile = async (e) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("hr_employeeid", hr_employeeid);
  try {
    const res = await axios.post(`${UrlServer}/apis/post/update_img_emp`, formData);
    console.log(res);
  } catch (ex) {
    console.log(ex);
  }
};

  //==================================
  async function Check_bom(credentials) {
    return fetch(`${UrlServer}/apis/post/post_form_hr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  //=================== onSubmit_input_form ==============
  const input_form = async (event) => {
    event.preventDefault();
    const response = await Check_bom({
      hr_employeeid,
      hr_employeename,
      hr_surname,
      hr_employee_eng,
      hr_lastname_eng,
      hr_nickname,
      hr_phone,
      hr_job_start,
      hr_email_user,
      hr_password,
      hr_employee_img,
      hr_emp,
      id_section,
      id_department,
      id_position,
      number_emp,
      birthday_emp,
    });
    await uploadFile();

    // =========================== swal =============================
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/web/add_position";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };

 

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
  
   
  const director =() => {
    document.getElementById('de').disabled=true;
    document.getElementById('po').disabled=true;
    setID_department("26");
    setID_position("50");
  }
  const manager =() => {
    document.getElementById('po').disabled=true;
    document.getElementById('de').disabled=false;
    // setID_department("26");
    setID_position("51");
  }
  
const AsstManager = () => {
    document.getElementById('po').disabled=true;
    document.getElementById('de').disabled=false;
    setID_position("63");
  }
  const cat_emp =() => {
    document.getElementById('de').disabled=false;
    document.getElementById('po').disabled=false;
  }

  

  //=========== return ==========================
  ////backgroundColor: "#808088"
  return (
    <>

      <div className="content">
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">ฟอร์มกรอกข้อมูลพนักงาน</h5>
              </CardHeader>

              <CardBody>
                <Form onSubmit={input_form}>
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <label> รหัสพนักงาน</label>
                        <Input
                          required
                          type="text"
                          placeholder="รหัสพนักงาน"
                          style={{ fontSize: "12px" }}
                          onChange={(e) => setHr_Employeeid(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label> เลขเครื่องสแกนนิ้ว</label>
                        <Input
                          required
                          type="text"
                          placeholder="เลขสแกนนิ้ว"
                          style={{ fontSize: "12px" }}
                          onChange={(e) => setNumber_emp(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="6">
                      <FormGroup>
                        <label> วันเข้างาน</label>
                        <Input
                          required
                          type="date"
                          placeholder="วันเข้างาน"
                          style={{ fontSize: "12px" }}
                          onChange={(e) => setHr_Job_Start(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> ชื่อ</label>
                        <Input
                          required
                          type="text"
                          placeholder="ชื่อ(ภาษาไทย)"
                          style={{ fontSize: "12px" }}
                          onChange={(e) => setHr_Employeename(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> นามสกุล</label>
                        <Input
                          required
                          type="text"
                          placeholder="นามสกุล"
                          style={{ fontSize: "12px" }}
                          onChange={(e) =>
                            setHr_Employeesurname(e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label>First Name</label>
                        <Input
                          required
                          type="text"
                          placeholder="First Name"
                          style={{ fontSize: "12px" }}
                          onChange={(e) => setHr_Employee_eng(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup class="col-md-12">
                        <label> Last Name</label>
                        <Input
                          required
                          type="text"
                          placeholder="Last Name"
                          style={{ fontSize: "12px" }}
                          onChange={(e) => setHr_Lastname_Eng(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <label> ชื่อเล่น</label>
                        <Input
                          required
                          type="text"
                          placeholder="ชื่อเล่น"
                          style={{ fontSize: "12px" }}
                          onChange={(e) =>
                            setHr_Employeenickname(e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label> วัน/เดือน/ปีเกิด</label>
                        <Input
                          required
                          type="date"
                          placeholder="birthday"
                          style={{ fontSize: "12px" }}
                          onChange={(e) =>
                            setBirthday_Emp(e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <label> เบอร์โทรศัพท์</label>
                        <Input
                          required
                          type="tel"
                          placeholder="เบอร์โทรศัพท์"
                          style={{ fontSize: "12px" }}
                          onChange={(e) => setHr_Employeephone(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup >
                        <label>พนักงาน</label>
                        <br />
                        <div style={{ paddingLeft: "30px" }}>
                          <Input
                            onClick={cat_emp}
                            required
                            type="radio"
                            id="emp_1"
                            value="รายเดือน"
                            name="cat_em"
                            onChange={(e) => setHr_Emp(e.target.value)}
                          />{" "}
                          <label>รายเดือน</label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                            onClick={cat_emp}
                            type="radio"
                            id="emp_2"
                            value="รายวัน"
                            name="cat_em"
                            onChange={(e) => setHr_Emp(e.target.value)}
                          />{" "}
                          <label>รายวัน</label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                          onClick={director}
                            type="radio"
                            id="emp_3"
                            value="ผู้อำนวยการ"
                            name="cat_em"
                            onChange={(e) => setHr_Emp(e.target.value)}
                          />
                          <label>ผู้อำนวยการ</label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                          onClick={manager}
                            type="radio"
                            id="emp_4"
                            value="ผู้จัดการ"
                            name="cat_em"
                            onChange={(e) => setHr_Emp(e.target.value)}
                          />
                          <label>ผู้จัดการ</label>

                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                          onClick={AsstManager}
                            type="radio"
                            id="emp_5"
                            value="ผู้ช่วยผู้จัดการ"
                            name="cat_em"
                            onChange={(e) => setHr_Emp(e.target.value)}
                          />
                          <label>ผู้ช่วยผู้จัดการ</label>
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm="6">
                      <FormGroup>
                        <label>สายงาน</label>
                        <Input
                          style={{ fontSize: "12px" }}
                          required
                          type="select"
                          onChange={(e) => setID_section(e.target.value)}
                        >
                          <option value="">เลือกสายงาน</option>
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

                    <Col sm="6">
                      <FormGroup>
                        <label>ฝ่าย</label>
                        <Input
                          style={{ fontSize: "12px" }}
                          id="de"
                          required
                          type="select"
                          onChange={(e) => setID_department(e.target.value)}
                        >
                          <option value="">เลือกฝ่าย</option>
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

                    <Col sm="6">
                      <FormGroup>
                        <label>ตำแหน่ง</label>
                        <Input
                          required
                          type="select"
                          id="po"
                          onChange={(e) => setID_position(e.target.value)}
                          style={{ fontSize: "12px" }}
                        >
                          {" "}
                          <option value="">เลือกตำแหน่งงาน</option>
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
                      <FormGroup>
                        <label> E-mail</label>
                        <Input
                          type="email"
                          placeholder="E-mail"
                          onChange={(e) => setHr_Email_User(e.target.value)}
                          style={{ fontSize: "12px" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Label> รหัสผ่าน</Label>
                        <Input
                          type="text"
                          // type="password"
                          placeholder="รหัสผ่าน"
                          onChange={(e) => setHr_Password(e.target.value)}
                          style={{ fontSize: "12px" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <label> รูปภาพ</label>
                  <Input
                   
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={saveFile}
                    style={{ fontSize: "14px" }}
                  ></Input>
                  <br />
                <button type="submit" style={{backgroundColor:"#28a745", color:"#fff",padding:"8px 10px 8px 10px", border:"#fff",fontSize:"13px",borderRadius:"5px",margin:"8px 0 10px 0"}}>บันทึกข้อมูล</button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}
