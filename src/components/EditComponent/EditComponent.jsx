import React, { useState, useEffect, useRef } from "react";
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
import "./EditComponent.scss";
export default function EditComponent(props) {
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
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [OlefileName, setOleFileName] = useState("");
  const id = props.match.params.hr_run_id;

  //=================== onSubmit_input_form ==============

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
    formData.append("hr_run_id", id);
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

  //============== dynamic_section=================
  useEffect(() => {
    fetch(`${UrlServer}/apis/get/allempedit/${props.match.params.hr_run_id}`)
      .then((response) => response.json())
      .then((result) => setData_all(result))
      .catch((Error) => Error);
  }, [props.match.params.hr_run_id]);

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

  const input_form = async (event) => {
    event.preventDefault();
    const fd = new FormData(form.current, { id_position: id_position });
    const fe = Object.fromEntries(fd.entries());
    const Data = {
      hr_run_id: id,
      hr_employeeid: fe.hr_employeeid,
      number_emp: fe.number_emp,
      hr_job_start: fe.hr_job_start,
      hr_employeename: fe.hr_employeename,
      hr_surname: fe.hr_surname,
      hr_employee_eng: fe.hr_employee_eng,
      hr_lastname_eng: fe.hr_lastname_eng,
      hr_nickname: fe.hr_nickname,
      birthday_emp: fe.birthday_emp,
      hr_phone: fe.hr_phone,
      id_section: fe.id_section,
      id_department: fe.id_department,
      id_position: fe.id_position,
      hr_emp: fe.cat_em,
      hr_email_user: fe.hr_email_user,
      status_emp: fe.work,
      hr_password: fe.hr_password,
      job_out: fe.job_out,
    };

    console.log(Data);
    fetch(`${UrlServer}/apis/post/emp_edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then((data) => data.json())
      .then((result) => {
        if ("status" in result) {
          swal("Success", result.message, "success", {
            buttons: false,
            timer: 2200,
          }).then(async (value) => {
            await uploadFile();
            window.location.href =
              "/web/edit_emp/" + props.match.params.hr_run_id;
          });
        } else {
          swal("แก้ไขตำแหน่งไม่สำเร็จ", result.message, "error");
        }
      });
  };

  const Click_approve = async (event) => {
    const Data = { hr_run_id: id };

    fetch(`${UrlServer}/apis/post/approve_emp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    })
      .then((data) => data.json())
      .then((result) => {
        if ("status" in result) {
          swal("Success", result.message, "success", {
            buttons: false,
            timer: 2200,
          }).then(async (value) => {
            window.location.href =
              "/web/edit_emp/" + props.match.params.hr_run_id;
          });
        } else {
          swal("แก้ไขตำแหน่งไม่สำเร็จ", result.message, "error");
        }
      });
  };
  const Set_edit = async () => {
    if (data_all.status_approve === "approve") {
      document.getElementById("btn_approve").hidden = true;
    }

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
      document.getElementById("birthday").disabled = true;
      document.getElementById("cat_6").checked = true;
      document.getElementById("img_emp").disabled = true;
      document.getElementById("id_emp").disabled = true;
      document.getElementById("num_emp").disabled = true;
      document.getElementById("date_emp").disabled = true;
      document.getElementById("name_emp").disabled = true;
      document.getElementById("surname_emp").disabled = true;
      document.getElementById("first_emp").disabled = true;
      document.getElementById("last_emp").disabled = true;
      document.getElementById("nickname_emp").disabled = true;
      document.getElementById("tel_emp").disabled = true;
      document.getElementById("section_emp").disabled = true;
      document.getElementById("de").disabled = true;
      document.getElementById("po").disabled = true;
      document.getElementById("cat_1").disabled = true;
      document.getElementById("cat_2").disabled = true;
      document.getElementById("cat_3").disabled = true;
      document.getElementById("cat_4").disabled = true;
      // document.getElementById("cat_5").disabled= true;
      document.getElementById("mail_emp").disabled = true;
      document.getElementById("pass").disabled = true;
      document.getElementById("btn_submit").disabled = true;
      document.getElementById("btn_approve").hidden = true;
      document.getElementById("check_date_out").disabled = true;
    }
  };

  const Click_emp = () => {
    document.getElementById("po").style.visibility = "";
    document.getElementById("de").style.visibility = "";
    document.getElementById("label_po").style.visibility = "";
    document.getElementById("label_de").style.visibility = "";
  };

  const manager = () => {
    document.getElementById("po").style.visibility = "hidden";
    document.getElementById("de").style.visibility = "";
    document.getElementById("label_po").style.visibility = "hidden";
    document.getElementById("label_de").style.visibility = "";
    setID_position("51");
  };

  const asstmanager = () => {
    document.getElementById("po").style.visibility = "hidden";
    document.getElementById("de").style.visibility = "";
    document.getElementById("label_po").style.visibility = "hidden";
    document.getElementById("label_de").style.visibility = "";
    setID_position("63");
  };

  const director = () => {
    document.getElementById("de").style.visibility = "hidden";
    document.getElementById("po").style.visibility = "hidden";
    document.getElementById("label_de").style.visibility = "hidden";
    document.getElementById("label_po").style.visibility = "hidden";
    setID_department("26");
    setID_position("50");
  };

  const Click_check_work = () => {
    // setJob_out_edit("");
    document.getElementById("check_date_out").style.display = "none";
    document.getElementById("label_check_date_out").style.display = "none";
    document.getElementById("check_date_out").required = false;
  };

  const dateout = () => {
    document.getElementById("check_date_out").style.display = "";
    document.getElementById("label_check_date_out").style.display = "";
    document.getElementById("check_date_out").required = true;
    document.getElementById("mail_emp").disabled = true;
    document.getElementById("pass").disabled = true;
  };

  //=========== return ==========================

  // ใส่ name ให้กับ type
  // image,hr_employeeid,number_emp,hr_job_start,hr_employeename,hr_surname,hr_employee_eng,hr_lastname_eng,hr_nickname,birthday_emp,hr_phone,id_section,id_department,id_position,cat_em,hr_email_user,work,job_out,Password,
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "25px",
    p: 4,
  };
  return (
    <>
      <div className="content" onLoad={Set_edit()}>
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">แก้ไขข้อมูลพนักงาน</h5>
              </CardHeader>
              <CardBody>
                <form ref={form} onSubmit={input_form}>
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

                      <br />
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <label> รหัสพนักงาน</label>
                        <Input
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
                              onClick={Click_emp}
                              id="cat_1"
                              type="radio"
                              value="รายเดือน"
                              name="cat_em"
                            />
                            <label>รายเดือน</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              onClick={Click_emp}
                              id="cat_2"
                              type="radio"
                              value="รายวัน"
                              name="cat_em"
                            />
                            <label>รายวัน</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              onClick={director}
                              id="cat_3"
                              type="radio"
                              value="ผู้อำนวยการ"
                              name="cat_em"
                            />
                            <label>ผู้อำนวยการ</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              onClick={manager}
                              id="cat_4"
                              type="radio"
                              value="ผู้จัดการ"
                              name="cat_em"
                            />
                            <label>ผู้จัดการ</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input
                              onClick={asstmanager}
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
                            onClick={Click_check_work}
                            id="cat_5"
                            type="radio"
                            value="ทำงานอยู่"
                            name="work"
                          />
                          <label id="label_job"> ทำงานอยู่ </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input
                            onClick={dateout}
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
                          id="pass"
                          type="password"
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
                  </Row>{" "}
                  {(() => {
                    if (name_department === '"HRM"') {
                      return (
                        <Button
                          id="btn_submit"
                          type="submit"
                          style={{
                            backgroundColor: "#ff3636",
                            fontSize: "12.5px",
                            fontWeight: "bolder",
                          }}
                        >
                          บันทึก
                        </Button>
                      );
                    }
                  })()}
                  &nbsp; &nbsp;
                  <Button
                    id="btn_approve"
                    type="button"
                    style={{ backgroundColor: "#666666", fontWeight: "bolder" }}
                    onClick={handleOpen_approve}
                  >
                    Approve
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* ============MODAL_return ====================== */}
        <div>
          <Modal
            open={open_approve}
            onClose={handleClose_approve}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <span>{job_run_id}</span> */}
              <h5 className="text-center">
                <b>ยืนยันการตรวจสอบข้อมูล</b>
              </h5>
              <br />
              <h5 className="text-center">ข้อมูลถูกต้อง</h5>
              <div className="text-center">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Button
                    variant="contained"
                    onClick={Click_approve}
                    size="small"
                    style={{ width: "30%" }}
                    fullWidth
                    color="success"
                  >
                    ตกลง
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleClose_approve}
                    size="small"
                    style={{ width: "30%" }}
                    fullWidth
                    color="error"
                  >
                    ยกเลิก
                  </Button>
                </Box>

                <br />
              </div>
            </Box>
          </Modal>
        </div>
        {/* ============MODAL_return ====================== */}
      </div>
    </>
  );
}
