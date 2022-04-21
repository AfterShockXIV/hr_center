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
import { useEffect } from "react";
import UrlServer from "Configs/PortServer";
import "./AddpositionComponent.scss";
export default function AddpositionComponent() {
  //======= ID Dynamic ====================================
  const [id_section, setID_section] = useState("");
  const [id_department, setID_department] = useState("");
  const [id_supervisor, setID_supervisor] = useState("");
  //================เก็บค่าจาก API =====================
  const [hr_section, setHr_section] = useState([]);
  const [hr_department, setHr_department] = useState([]);
  const [hr_supervisor, setHr_supervisor] = useState([]);
  const [thai_position, setThai_position] = useState("");
  const [eng_position, setEng_position] = useState("");
  const [cat_emp, setCat_emp] = useState("");
  const [hr_supervisorCount, setHr_supervisorCount] = useState("");
  //================== file ==============
  //   const [file, setFile] = useState();
  //   const [fileName, setFileName] = useState("");
  console.log(hr_supervisor);
  //==================================
  async function Check_bom(credentials) {
    return fetch(`${UrlServer}/apis/post_position/add_position`, {
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
      id_section,
      id_department,
      thai_position,
      eng_position,
      cat_emp,
      id_supervisor,
      hr_supervisorCount
    });
    // =========================== swal =============================
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href =
        //   "/web/position_edit/" +
        //   response.id_section +
        //   "/" +
        //   response.id_department +
        //   "/" +
        //   response.id_position;
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
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

  //========== dynamic_dapartment==============
  useEffect(() => {
    fetch(`${UrlServer}/apis/dynamic/dynamic_supervisor/${id_department}`)
      .then((response) => response.json())
      .then((result) => {
        setHr_supervisor(result.supdata)
        setHr_supervisorCount(result.supcount)
      } )

      .catch((Error) => Error);
  }, [id_department]);

  const manager = () => {
    document.getElementById("txtSup").disabled = true;
  };

  const Click_emp = () => {
    document.getElementById("txtSup").disabled = false;
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">เพิ่มชื่อฝ่าย/ตำแหน่ง</h5>
              </CardHeader>

              <CardBody>
                <Form onSubmit={input_form}>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <label>ระดับ</label>
                        <br />
                        <div
                          className="Radio_padding"
                          style={{ paddingLeft: "30px" }}
                        >
                          <Input
                            onClick={manager}
                            type="radio"
                            id="emp_4"
                            value="Mg"
                            name="cat_emp"
                            onChange={(e) => setCat_emp(e.target.value)}
                          />
                          <label>ผู้จัดการ</label>
                          <Input
                            onClick={manager}
                            type="radio"
                            id="emp_5"
                            value="Ass"
                            name="cat_emp"
                            onChange={(e) => setCat_emp(e.target.value)}
                          />
                          <label>ผู้ช่วยผู้จัดการ</label>
                          <Input
                            onClick={manager}
                            type="radio"
                            id="emp_5"
                            value="Sup"
                            name="cat_emp"
                            onChange={(e) => setCat_emp(e.target.value)}
                          />
                          <label>หัวหน้าแผนก</label>
                          <Input
                            onClick={Click_emp}
                            required
                            type="radio"
                            id="emp_1"
                            value="Emp"
                            name="cat_emp"
                            onChange={(e) => setCat_emp(e.target.value)}
                          />{" "}
                          <label>รายเดือน</label>
                          <Input
                            onClick={Click_emp}
                            type="radio"
                            id="emp_2"
                            value="EmpDay"
                            name="cat_emp"
                            onChange={(e) => setCat_emp(e.target.value)}
                          />{" "}
                          <label>รายวัน</label>
                        </div>
                      </FormGroup>
                    </Col>

                    <Col sm="4">
                      <FormGroup>
                        <Label id="lbSec">สายงาน</Label>
                        <Input
                          id="txtSec"
                          required
                          type="select"
                          onChange={(e) => setID_section(e.target.value)}
                          style={{ fontSize: "14px" }}
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

                    <Col sm="4">
                      <FormGroup>
                        <Label id="lbDe">ฝ่าย</Label>
                        <Input
                          id="txtDe"
                          required
                          type="select"
                          onChange={(e) => setID_department(e.target.value)}
                          style={{ fontSize: "14px" }}
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

                    <Col sm="4">
                      <FormGroup>
                        <Label id="lbDe">Supervisor</Label>
                        <Input
                          id="txtSup"
                          required
                          type="select"
                          onChange={(e) => setID_supervisor(e.target.value)}
                          style={{ fontSize: "14px" }}
                        >
                          <option value="">เลือก Supervisor</option>
                          {hr_supervisor.map((data) => {
                            return (
                              <option value={data.id_position}>
                                {data.eng_position}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col sm="4">
                      <FormGroup>
                        <Label id="lbTh">ชื่อตำแหน่ง/ฝ่าย(THAI)</Label>
                        <Input
                          id="txtTh"
                          required
                          type="text"
                          placeholder="ตำแหน่ง(ภาษาไทย)"
                          onChange={(e) => setThai_position(e.target.value)}
                          style={{ fontSize: "14px" }}
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm="4">
                      <FormGroup>
                        <Label id="lbEng">ชื่อตำแหน่ง/ฝ่าย(ENG)</Label>
                        <Input
                          id="txtEng"
                          required
                          type="text"
                          placeholder="ตำแหน่ง(ภาษาอังกฤษ)"
                          onChange={(e) => setEng_position(e.target.value)}
                          style={{ fontSize: "14px" }}
                        ></Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Button type="submit">บันทึกข้อมูล</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
