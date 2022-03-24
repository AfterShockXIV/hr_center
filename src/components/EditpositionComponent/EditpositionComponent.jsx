import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup, Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import swal from "sweetalert";

import PanelHeader from "components/PanelHeader/PanelHeader";
import { useEffect } from "react";


export default function EditpositionComponent(props) {
  // const [id_position, setID_position] = useState("");
  // const [id_section, setID_section] = useState("");
  // const [id_department, setID_department] = useState("");
  // const [thai_position, setThai_position] = useState("");
  // const [eng_position, setEng_position] = useState("");

  //===== แก้ไข
  const [thai_position_edit, setThai_position_edit] = useState("");
  const [eng_position_edit, setEng_position_edit] = useState("");
  const [data_all_id, setData_all_id] = useState([]);
  // const [hr_section, setHr_section] = useState([]);
  // const [hr_department, setHr_department] = useState([]);
  // const [hr_position, setHr_position] = useState([]);

  const server = "http://localhost:4000/";
  
  useEffect(() => {
    fetch(
      server +
        "set_addposition/" +
        props.match.params.id_section +
        "/" +
        props.match.params.id_department +
        "/" +
        props.match.params.id_position
    )
      .then((response) => response.json())
      .then((result) => setData_all_id(result))
      .catch((Error) => Error);

      
  }, []);
  let id_position = props.match.params.id_position
  async function Check_bom(credentials) {
    return fetch(server + "position_edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }
 
  const input_form = async (event) => {
    let thai = thai_position_edit
    if(thai_position_edit === ""){
      thai = data_all_id.thai_position 
    }

    let eng = eng_position_edit
    if(eng_position_edit === ""){
      eng = data_all_id.eng_position 
    }

    event.preventDefault();
    const response = await Check_bom({
      thai,
      eng,
      id_position,
    });
    if ("status" in response) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2200,
      }).then((value) => {
        window.location.href = "/admin/Position_ed/"+ props.match.params.id_section + "/" +  props.match.params.id_department +"/"  + props.match.params.id_position;
      });
    } else {
      swal("แก้ไขตำแหน่งไม่สำเร็จ", response.message, "error");
    }
  };


  // useEffect(() => {
  //   fetch("http://localhost:4000/dynamic_department/" + id_section_edit)
  //     .then((response) => response.json())
  //     .then((result) => setHr_department(result))
  //     .catch((Error) => Error);
  // }, [id_section_edit]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/dynamic_position/" + id_department_edit)
  //     .then((response) => response.json())
  //     .then((result) => setHr_position(result))
  //     .catch((Error) => Error);
  // }, [id_department_edit]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/dynamic_position/" + id_position_edit)
  //     .then((response) => response.json())
  //     .then((result) => setHr_position(result))
  //     .catch((Error) => Error);
  // }, [id_position_edit]);

  // useEffect(() => {
  //   setThai_position_edit(data_all_id.thai_position);
  //   setEng_position_edit(data_all_id.eng_position);
  // }, []);



  return (
    <>
      <PanelHeader size="sm" />
      <div className="content" >
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">แก้ไขชื่อฝ่าย-ตำแหน่ง</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={input_form}>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <label>สายงาน</label>
                        <Input
                          disabled
                          defaultValue={data_all_id.eng_section}
                          style={{
                            backgroundColor: "#ebecf0",
                            fontSize: "14px",
                          }}
                          onChange={(e) => setID_section_edit(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <lable>ฝ่าย</lable>
                        <Input
                          disabled
                          defaultValue={data_all_id.eng_department}
                          style={{
                            fontSize: "14px",
                            backgroundColor: "#ebecf0",
                          }}
                          onChange={(e) =>
                            setID_department_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <lable>ชื่อตำแหน่ง/ฝ่าย(THAI)</lable>
                        <Input
                          type="text"
                          required
                          style={{
                            fontSize: "14px",
                          }}
                          defaultValue={data_all_id.thai_position}
                          onChange={(e) =>
                            setThai_position_edit(e.target.value)
                          }
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <lable>ชื่อตำแหน่ง/ฝ่าย(ENG)</lable>
                        <Input
                          type="text"
                          required
                          defaultValue={data_all_id.eng_position}
                          style={{
                            fontSize: "14px",
                          }}
                          onChange={(e) => setEng_position_edit(e.target.value)}
                        ></Input>
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
