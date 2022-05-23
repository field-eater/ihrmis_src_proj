import TextAreaComponent from "../../../../../../common/input_component/textarea_input_component/textarea_input_component";
import dostLogo from "../../../../../../../assets/images/logo.png";
import WeightingTable from "../weight_table";
import React, { useEffect, useState } from "react";
import CheckJobCompetency from "../check_job_competency";
import RemarksForm from "../remarks_form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_HOST } from "../../../../../../../helpers/global/global_config";
import {
  setCompetencies,
  setDutyResponsibility,
  setEducation,
  setEligibility,
  setEmployeeOptions,
  setIsEmptyCompetency,
  setMinimumRequirement,
  setOffice,
  setPlantilla,
  setPosition,
  setRefreh,
  setTotalWeight,
  setTraining,
  setVersionSelected,
  setWorkExp,
} from "../../../../../../../features/reducers/jvscrw_slice";
import { setBusy } from "../../../../../../../features/reducers/popup_response";
import DutiesResponsibilityTable from "../duties_responsibility_table";
import { useParams } from "react-router-dom";
import ButtonComponent from "../../../../../../common/button_component/button_component.js";
import {
  ALERT_ENUM,
  popupAlert,
} from "../../../../../../../helpers/alert_response";
import { usePopUpHelper } from "../../../../../../../helpers/use_hooks/popup_helper";
import Swal from "sweetalert2";

// TODO: change jvsId to actual value

const JvsFormOne = () => {
  // REDUX FUNCTIONALITIES
  const {
    plantilla_item,
    position,
    office,
    eligibility,
    education,
    training,
    experience,
    competencies,
    minimum_req,
    refresh,
  } = useSelector((state) => state.jvsform);
  const dispatch = useDispatch();
  const { item } = useParams();

  const [itemJvsVersions, setItemJvsVersions] = useState();
  const [version, setVersions] = useState([]); // ALL VERSIONS ARE RECORDED
  // const [verSelected, setVerSelected] = useState(); // THIS IS THE CURRENT VERSION SELECTED

  const [jvscrwID, setJvscrwID] = useState(); // THIS IS FOR ACQUIRING JVS ID

  const versionSelectedFetch = (jvs_id) => {
    fetchJvsDutiesResponsibityOnLoad(jvs_id);
    fetchCompetenciesOnLoad(jvs_id);
  };

  // FETCH COMPETENCY TYPES
  const fetchCscQualificationOnLoad = async () => {
    dispatch(setBusy(true));
    await axios
      .get(API_HOST + "jvscrw/" + item)
      .then((res) => {
        dispatch(setPlantilla(res.data.data));
        dispatch(setPosition(res.data.data?.position));
        dispatch(setOffice(res.data.data?.office));

        const cscQualification = res.data?.data.position.csc_standards;

        cscQualification.forEach((element) => {
          if (element.std_type === "CS") {
            dispatch(setEligibility(element));
          } else if (element.std_type === "ED") {
            dispatch(setEducation(element));
          } else if (element.std_type === "EX") {
            dispatch(setWorkExp(element));
          } else if (element.std_type === "TR") {
            dispatch(setTraining(element));
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    dispatch(setBusy(false));
  };

  const fetchJvsDutiesResponsibityOnLoad = async (jvsId) => {
    await axios
      .get(API_HOST + "jvscrw-duty-responsibility/" + jvsId)
      .then((res) => {
        dispatch(setDutyResponsibility(res.data.data));
      })
      .catch((err) => console.log(err.message));

    dispatch(setTotalWeight());
  };

  //COMPETENCY RATING RECORDS
  const valueEmptyRating = (isEmpty, element) => {
    return {
      ...isEmpty,
      [element["com_type"]]: element["tbl_com_type"].length > 0,
    };
  };

  const fetchCompetenciesOnLoad = async (jvsId) => {
    await axios
      .get(API_HOST + "jvscrw-rating/" + jvsId)
      .then((res) => {
        let data = res.data.data;
        let com_education = {},
          com_writtenExam = {},
          com_computationSKills = {},
          com_oralExam = {},
          com_creativeWork = {},
          com_analyticalSkills = {},
          com_training = {},
          com_others = {},
          com_experience = {};
        let isEmpty = {};
        data.forEach((element) => {
          if (element["com_type"] === "ED") {
            com_education = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "WE") {
            com_writtenExam = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "CS") {
            com_computationSKills = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "OE") {
            com_oralExam = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "CW") {
            com_creativeWork = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "AS") {
            com_analyticalSkills = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "TR") {
            com_training = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "OT") {
            com_others = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          } else if (element["com_type"] === "EX") {
            com_experience = element ?? [];
            isEmpty = valueEmptyRating(isEmpty, element);
          }
        });
        dispatch(setIsEmptyCompetency(isEmpty));

        dispatch(
          setCompetencies({
            com_education,
            com_writtenExam,
            com_computationSKills,
            com_oralExam,
            com_creativeWork,
            com_analyticalSkills,
            com_training,
            com_others,
            com_experience,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const fetchJvsAllVersion = () => {
    axios
      .get(API_HOST + "jvscrw-get-jvs-ver/" + item)
      .then((res) => {
        const dataVersion = res.data.data;
        setItemJvsVersions(dataVersion);
        let verJvs = [];
        dataVersion.forEach((element) => {
          verJvs.push({
            value: element.jvs_version,
            label: element.jvs_version,
          });
        });
        setJvscrwID(dataVersion[0].jvs_id);
        setVersions(verJvs);
      })
      .catch((err) => console.log(err));
  };

  const jvsVersionOnChange = (value) => {
    itemJvsVersions?.forEach((element) => {
      if (value == element.jvs_version) {
        setJvscrwID(element.jvs_id);
        dispatch(setVersionSelected(element.jvs_version));
      }
    });
  };

  const fetchEmployeeOption = async () => {
    await axios
      .get(API_HOST + "get-option-employee/" + item)
      .then((res) => {
        dispatch(setEmployeeOptions(res.data.data));
      })
      .catch((err) => console.log(err.message));
  };

  const { renderBusy } = usePopUpHelper();

  const createNewVersion = async () => {
    renderBusy(true);
    await axios
      .get(API_HOST + "new-jvs-version/" + item)
      .then((res) => {
        renderBusy(false);
        Swal.fire({
          title: "Succeeded!",
          text: "New JVS was Created!",
          icon: "success",
          confirmButtonColor: "#5cb85c",
        }).then((result) => {
          if (result.isConfirmed) {
            jvsVersionOnChange(res.data.jvs_version);
            dispatch(setRefreh());
          }
        });
      })
      .catch((err) => {
        renderBusy(false);
        popupAlert({
          message: err.response.message ?? err.message,
          type: ALERT_ENUM.fail,
        });
      });
  };

  useEffect(() => {
    fetchJvsAllVersion();
    fetchCscQualificationOnLoad();
    fetchEmployeeOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    versionSelectedFetch(jvscrwID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jvscrwID]);

  useEffect(() => {
    if (version) {
      dispatch(setVersionSelected(version[0]?.value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  return (
    <React.Fragment>
      <div className="form-header">
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
          <h3>Department of Science and Technology</h3>
          <p>General Santos Avenue, Bicutan Taguig City</p> <br />
          <h2>JOB VACANCY SPECIFICATION & CRITERIA RATING FORM</h2>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="version-dropdown">
        <span>Version</span>
        <span className="margin-left-1">
          <select
            // value={version_selected}
            className="select-version"
            onChange={(e) => jvsVersionOnChange(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              Select version
            </option>
            {version?.map((element) => {
              return (
                <option key={element.value} value={element.value}>
                  {element.label}
                </option>
              );
            })}
          </select>
        </span>
        <span className="margin-left-1">
          <ButtonComponent
            buttonName="New"
            onClick={() => createNewVersion()}
          />
        </span>
      </div>
      <br />
      {/* TABLE DESIGN VIEW STARTS HERE  */}
      <div className="jvs-crw-main-table">
        <table id="custom-table">
          <thead>
            {/* ====================================================================*/}
            <tr className="main-headers">
              <th style={{ textAlign: "center" }} colSpan="4">
                JOB POSITION
              </th>
            </tr>
            {/* FIRST HEADER  */}
          </thead>
          <tbody>
            <tr className="secondary-headers">
              <th className="row-percent-50" colSpan="2">
                POSITION TITLE
              </th>
              <th className="row-percent-50" colSpan="2">
                PLANTILLA ITEM NO.
              </th>
            </tr>
            <tr>
              <td className="row-percent-50" colSpan="2">
                {position?.title}
              </td>
              <td className="row-percent-50" colSpan="2">
                {plantilla_item?.itm_no}
              </td>
            </tr>
            {/* SECOND HEADER  */}
            <tr className="secondary-headers">
              <th className="row-percent-50" colSpan="2">
                OFFICE/UNIT
              </th>
              <th className="row-percent-50" colSpan="2">
                PLACE OF ASSIGNMENT
              </th>
            </tr>
            <tr>
              <td className="row-percent-50" colSpan="2">
                {office?.ofc_name}
              </td>
              <td className="row-percent-50" colSpan="2">
                {plantilla_item?.agency}
              </td>
            </tr>
            {/* THIRD HEADER  */}
            <tr className="secondary-headers">
              <th className="row-percent-50" colSpan="2">
                REPORTS TO
              </th>
              <th className="row-percent-50" colSpan="2">
                SALARY GRADE
              </th>
            </tr>
            <tr>
              <td className="row-percent-50" colSpan="2">
                {plantilla_item?.report_to}
              </td>
              <td className="row-percent-50" colSpan="2">
                {position?.salary_grade}
              </td>
            </tr>
          </tbody>
          {/* ====================================================================*/}
          {/* CSC QUALIFICATION STANDARDS STARTS HERE  */}
          <tbody>
            <tr className="main-headers">
              <th style={{ textAlign: "center" }} colSpan="4">
                CSC QUALIFICATION STANDARDS
              </th>
            </tr>
            {/* FIRST HEADER  */}
            <tr className="secondary-headers">
              <th colSpan="4">ELIGIBILITY</th>
            </tr>
            <tr>
              <td colSpan="4">{eligibility?.std_specifics}</td>
            </tr>
            {/* SECOND HEADER  */}
            <tr className="row-percent-75x secondary-headers">
              <th colSpan="3">EDUCATION</th>
            </tr>
            <tr>
              <td colSpan="3">{education?.std_specifics}</td>
            </tr>
            {/* THIRD HEADER  */}
            <tr className="secondary-headers">
              <th colSpan="3">EXPERIENCE</th>
            </tr>
            <tr>
              <td colSpan="3">{experience?.std_specifics}</td>
            </tr>
            {/* FOURTH HEADER  */}
            <tr className="secondary-headers">
              <th colSpan="3">TRAINING</th>
            </tr>
            <tr>
              <td colSpan="3">{training?.std_specifics}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />

      <WeightingTable
        title="EDUCATION"
        type="ED"
        jvsId={jvscrwID}
        data={competencies.com_education.tbl_com_type}
      />
      <br />
      <WeightingTable
        title="RELEVANT TRAINING"
        type="TR"
        jvsId={jvscrwID}
        data={competencies.com_training.tbl_com_type}
      />
      <br />
      <WeightingTable
        title="RELEVANT EXPERIENCE"
        type="EX"
        jvsId={jvscrwID}
        data={competencies.com_experience.tbl_com_type}
      />
      <br />
      {/*REQUIRED JOB COMPETENCY */}
      <h3 style={{ color: "#4276A4", fontSize: "14px", marginBottom: "6px" }}>
        REQUIRED JOB COMPETENCY
      </h3>
      <div style={{ marginBottom: "5px" }}>
        <TextAreaComponent
          value={minimum_req}
          onChange={(e) => {
            dispatch(setMinimumRequirement(e.target.value));
            console.log(minimum_req);
          }}
          row="2"
        />
      </div>
      <span
        style={{ color: "#4276A4", fontSize: "12px", fontWeight: "normal" }}
      >
        (Please check all that apply)
      </span>
      <CheckJobCompetency
        title="Written Exam"
        type="WE"
        jvsId={jvscrwID}
        data={competencies.com_writtenExam}
      />
      <CheckJobCompetency
        title="Oral Exam"
        type="OE"
        jvsId={jvscrwID}
        data={competencies.com_oralExam}
      />
      <CheckJobCompetency
        title="Creative Work"
        type="CW"
        jvsId={jvscrwID}
        data={competencies.com_creativeWork}
      />
      <CheckJobCompetency
        title="Analytical Skills"
        type="AS"
        jvsId={jvscrwID}
        data={competencies.com_analyticalSkills}
      />
      <CheckJobCompetency
        title="Computation Skills"
        type="CS"
        jvsId={jvscrwID}
        data={competencies.com_computationSKills}
      />
      <CheckJobCompetency
        title="Others"
        type="OT"
        jvsId={jvscrwID}
        data={competencies.com_others}
      />
      <br />
      <br />
      <TotalCalculation />
      <br />
      <br />
      <DutiesResponsibilityTable jvsId={jvscrwID} />
      <br />
      <br />
      <RemarksForm jvsId={jvscrwID} />
      <br />
      <br />
    </React.Fragment>
  );
};

export default JvsFormOne;

const TotalCalculation = () => {
  const { totalMinMaxData } = useSelector((state) => state.jvsform);

  return (
    <React.Fragment>
      <div className="scoring-div">
        <div>
          <h6
            style={{ color: "#4276A4", fontSize: "14px", marginBottom: "6px" }}
          >
            Total Minimum Factor Weight (%):
            <span>
              <strong>{totalMinMaxData?.min ? totalMinMaxData?.min : 0}</strong>
            </span>
          </h6>
        </div>
        <div>
          <h6
            style={{ color: "#4276A4", fontSize: "14px", marginBottom: "6px" }}
          >
            Total Maximum Factor Weight (%):
            <span>
              <strong>{totalMinMaxData?.max ? totalMinMaxData?.max : 0}</strong>
            </span>
          </h6>
        </div>
      </div>
      <div className="scoring-div">
        <div>
          <h6>
            TOTAL OVERALL FACTOR WEIGHT (%):
            <span>
              <strong>
                {totalMinMaxData?.total ? totalMinMaxData?.total : 0}
              </strong>
            </span>
          </h6>
        </div>
      </div>
    </React.Fragment>
  );
};
