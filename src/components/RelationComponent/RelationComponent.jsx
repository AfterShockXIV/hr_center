import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "reaflow";
import {
  Label,
  Input,
  Card,
  CardBody,
} from "reactstrap";
import UrlServer from "Configs/PortServer";

const ProfileComponent = (props) => {
  const [zoom, setZoom] = useState(0.7);
  const ref = useRef(null);
  const id_section_local = localStorage.getItem("id_section");
  const [relationNodeData, setRelationNodeData] = useState([]);
  const [relationEdgesData, setRelationEdgesData] = useState([]);
  const [hr_section, setHr_section] = useState([]);
  const [id_section, setID_section] = useState(id_section_local.slice(1,-1));
  useEffect(() => {
    fetch(UrlServer + "/apis/get/RelationData/"+id_section)
      .then((response) => response.json())
      .then((result) => {
        setRelationNodeData(result.NodeData);
        setRelationEdgesData(result.EdgesData);
      })
      .catch((Error) => Error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_section]);

  useEffect(() => {
    fetch(`${UrlServer}/apis/dynamic/dynamic_section`)
      .then((response) => response.json())
      .then((result) => setHr_section(result))
      .catch((Error) => Error);
  }, []);

  return (
    <>
      <div className="content">
        <Card>
          <CardBody>
            <div>
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
                    <option value={data.id_section}>{data.eng_section}</option>
                  );
                })}
              </Input>
              <pre
                style={{
                  zIndex: 9,
                  position: "absolute",
                  bottom: 15,
                  right: 15,
                  background: "rgba(0, 0, 0, .5)",
                  padding: 20,
                  color: "white",
                }}
              >
                {/* Zoom: {zoom} */}

                <button
                  style={{ display: "block", width: "100%", margin: "5px 0" }}
                  onClick={() => ref.current.zoomIn()}
                >
                  Zoom In
                </button>
                <button
                  style={{ display: "block", width: "100%", margin: "5px 0" }}
                  onClick={() => ref.current.zoomOut()}
                >
                  Zoom Out
                </button>
                <button
                  style={{ display: "block", width: "100%" }}
                  onClick={() => ref.current.fitCanvas()}
                >
                  Fit
                </button>
              </pre>
              <Canvas
                // arrow={<MarkerArrow style={{ fill: '#b1b1b7' }} />}
                // maxWidth={2500}
                maxHeight={600}
                maxZoom={0.2}
                minZoom={-0.9}
                zoom={zoom}
                ref={ref}
                arrow={null}
                nodes={relationNodeData}
                edges={relationEdgesData}
                onZoomChange={(z) => {
                  // console.log("zooming", z);
                  setZoom(z);
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ProfileComponent;
