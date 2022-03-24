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
import UrlServer from "Configs/PortServer";

export default function EditpositionComponent(props) {
  //===== แก้ไข
  const form = useRef();
  const [data_all_id, setData_all_id] = useState([]);

  useEffect(() => {
    fetch(
      UrlServer +
        "/apis/get/AllSection/" +
        props.match.params.id_section +
        "/" +
        props.match.params.id_department +
        "/" +
        props.match.params.id_position
    )
      .then((response) => response.json())
      .then((result) => setData_all_id(result))
      .catch((Error) => Error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
let id_position =  props.match.params.id_position
  const input_form = async (event) => {
    event.preventDefault();
    const fd = new FormData(form.current,{id_position:id_position});
    const fe = Object.fromEntries(fd.entries());
    const Data = {id_position:id_position , th_position : fe.th_position , eng_position : fe.eng_position}
    console.log(Data)
    fetch(`${UrlServer}/apis/post/position_edit`, {
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
          }).then((value) => {
            window.location.href =
              "/web/position_edit/" +
              props.match.params.id_section +
              "/" +
              props.match.params.id_department +
              "/" +
              props.match.params.id_position;
          });
        } else {
          swal("แก้ไขตำแหน่งไม่สำเร็จ", result.message, "error");
        }
      });

    // const response = await Check_bom({
    //   thai,
    //   eng,
    //   id_position,
    // });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="11">
            <Card style={{ marginLeft: "4%" }}>
              <CardHeader style={{ backgroundColor: "#747474", color: "#fff" }}>
                <h5 className="title">แก้ไขชื่อฝ่าย-ตำแหน่ง</h5>
              </CardHeader>
              <CardBody>
                <form onSubmit={input_form} ref={form}>
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
                        ></Input>
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <lable>ชื่อตำแหน่ง/ฝ่าย(THAI)</lable>
                        <Input
                          type="text"
                          name="th_position"
                          required
                          style={{
                            fontSize: "14px",
                          }}
                          defaultValue={data_all_id.thai_position}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <lable>ชื่อตำแหน่ง/ฝ่าย(ENG)</lable>
                        <Input
                          type="text"
                          name={"eng_position"}
                          required
                          defaultValue={data_all_id.eng_position}
                          style={{
                            fontSize: "14px",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Button type="submit">ตกลง</Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
