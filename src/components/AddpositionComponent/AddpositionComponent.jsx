import React, { useState } from "react";
import {Row,Col,Button,Form,FormGroup,Label,Input,Card,CardHeader,CardBody,} from "reactstrap";
import swal from "sweetalert";
import { useEffect } from "react";

export default function AddpositionComponent() {

  
  //======= ID Dynamic ====================================
  const [id_section, setID_section] = useState("");
  const [id_department, setID_department] = useState("");

  //================เก็บค่าจาก API =====================
  const [hr_section, setHr_section] = useState([]);
  const [hr_department, setHr_department] = useState([]);
  const [thai_position,setThai_position] = useState("");
  const [eng_position,setEng_position] = useState("")

  //================== file ==============
//   const [file, setFile] = useState();
//   const [fileName, setFileName] = useState("");
  
  const server = "http://localhost:4000/";

  //==================================
  async function Check_bom(credentials) {
    return fetch(server + "post_addposition", {
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
     
    });
    // =========================== swal =============================
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        // window.location.href = "/admin/Add_sap";
      });
    } else {
      swal("เพิ่มข้อมูลไม่สำเร็จ", response.message, "error");
    }
  };
  //=========== type file_img=========
//   const saveFile = (e) => {
//     setFile(e.target.files[0]);
//     setFileName(e.target.files[0].name);
//   };
//   const uploadFile = async (e) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileName", fileName);
//     formData.append("hr_employeeid", hr_employeeid);
//     try {
//       const res = await axios.post("http://localhost:4000/upload", formData);
//       console.log(res);
//     } catch (ex) {
//       console.log(ex);
//     }
//   };
  //============== dynamic_section=================
  useEffect(() => {
    fetch("http://localhost:4000/dynamic_section")
      .then((response) => response.json())
      .then((result) => setHr_section(result))
      .catch((Error) => Error);
  }, []);

  //========== dynamic_dapartment==============
  useEffect(() => {
    fetch("http://localhost:4000/dynamic_department/" + id_section)
      .then((response) => response.json())
      .then((result) => setHr_department(result))
      .catch((Error) => Error);
  }, [id_section]);

  //backgroundColor: "#808088"
  return (
    <>
      <div className="content">
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{backgroundColor:"#747474",color: "#fff" }}>
                <h5 className="title">เพิ่มชื่อฝ่าย/ตำแหน่ง</h5>
              </CardHeader>

              <CardBody>
                <Form onSubmit={input_form}>
                  <Row>
                    <Col sm="3">
                      <FormGroup>
                        <Label>สายงาน</Label>
                        <Input
                        required
                          type="select"
                          onChange={(e) => setID_section(e.target.value)} style={{fontSize:"14px"}}
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

                    <Col sm="3">
                      <FormGroup>
                        <Label>ฝ่าย</Label>
                        <Input
                        required
                          type="select"
                          onChange={(e) => setID_department(e.target.value)} style={{fontSize:"14px"}}
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
                    <Col sm="3">
                      <FormGroup>
                        <Label>ชื่อตำแหน่ง/ฝ่าย(THAI)</Label>
                        <Input
                        required
                          type="text"
                          placeholder="ตำแหน่ง(ภาษาไทย)"
                          onChange={(e) => setThai_position(e.target.value)} style={{fontSize:"14px"}}> 
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col sm="3">
                      <FormGroup>
                        <Label>ชื่อตำแหน่ง/ฝ่าย(ENG)</Label>
                        <Input
                        required
                          type="text"
                          placeholder="ตำแหน่ง(ภาษาอังกฤษ)"
                          onChange={(e) => setEng_position(e.target.value)} style={{fontSize:"14px"}}>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Button type="submit">ตกลง</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}




