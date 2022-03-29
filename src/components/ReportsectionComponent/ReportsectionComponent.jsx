import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Card, CardBody } from "reactstrap";
import UrlServer from "Configs/PortServer";
import { Button } from "@mui/material";
export default function ReportsectionComponent() {
  const [, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data_status, setData_status] = useState([]);

  // const server = "http://localhost:3010";

  useEffect(() => {
    fetch(`${UrlServer}/apis/get/AllSection`)
      .then((response) => response.json())
      .then((result) => setData_status(result))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  //================== แก้ไข ============================

  // const check_edit = (hr_employeename ,hr_surname ) => {
  //   console.log("name : " + hr_employeename )
  //   console.log("surname : " + hr_surname )

  // }
  //การ filter
  // const filter_api = data_status.filter((data)=>{
  //   return data.BANPR === '05';
  // })

  // const test = 1 ;
  console.log(data_status);
  const row = [];
  data_status.forEach((data, key) => {
    row.push({
      edit: (
        <div>
          {" "}
          <a
            href={
              "/web/position_edit/" +
              data.id +
              "/" +
              data.id_department +
              "/" +
              data.id_position
            }
          >
            <Button variant="contained" size="small" type="button" className="button" color="secondary">Click</Button>
          </a>
        </div>
      ),
      //delete:<div ><a href={'http://localhost:4000/delete_position/'+data.id_position} ><button type="button" style={{backgroundColor:"#000", borderColor:"#000"}} onClick ={() => alert("ต้องการลบข้อมูลตำแหน่ง" +data.eng_position)}>ลบข้อมูล</button></a></div>,
      section: data.eng_section,
      department: data.eng_department,
      position_thai: data.thai_position,
      position_eng: data.eng_position,
    });
  });
  const datatable = {
    columns: [
      {
        label: "แก้ไขข้อมูล",
        field: "edit",
        width: 100,
      },
      // {
      //   label: "ลบข้อมูล",
      //   field: "delete",
      //   width:  100,
      // },
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
        label: "ชื่อตำแหน่ง(Th)",
        field: "position_thai",
        width: 150,
      },
      {
        label: "ชื่อตำแหน่ง(Eng)",
        field: "position_eng",
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
