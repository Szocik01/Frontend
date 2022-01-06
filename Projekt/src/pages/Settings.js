import style from "./Settings.module.css";
import { useState, useEffect,Fragment } from "react";
import SettingsNavigation from "../components/settingsComponents/SettingsNavigation";
import ContentContainer from "../components/settingsComponents/ContentContainer";
import { useDispatch, useSelector } from "react-redux";
import { positionActions } from "../storage/redux-index";
import { Route, Routes } from "react-router-dom";
import PasswordChange from "../components/settingsComponents/Subpages/PasswordChange";
import AddQuestion from "../components/settingsComponents/Subpages/AddQuestion";
import ManageCourses from "../components/settingsComponents/Subpages/ManageCourses";
import ModifyQuestion from "../components/settingsComponents/Subpages/ModifyQuestion";
import InformationBox from "../components/UI/InformationBox";
import Confirmation from "../components/UI/Confirmation";
import SchoolsManager from "../components/settingsComponents/Subpages/SchoolsManager";

export default function Settings() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const informationBox = useSelector((s) => s.informationBoxManager);
  const confirmationManager = useSelector((s) => s.confirmation);

  const dispatch = useDispatch();

  const logindata = useSelector((state) => { return state.autoIndentification; });
  const isHeadAdmin =logindata.isHeadAdmin;
  const permissionsArray=logindata.permissions;

  useEffect(() => {
    dispatch(positionActions.pagePositionChange(3 * 3.4));
  }, [dispatch]);

  function toggleMenuHandler() {
    setIsMenuActive((prevState) => {
      return !prevState;
    });
  }
  console.log(confirmationManager.isVisible);
  return (
    <Fragment>
      {confirmationManager.isVisible && <Confirmation />}
      <InformationBox
        show={informationBox.visible}
        isError={informationBox.isError}>
        {informationBox.message}
      </InformationBox>

      <div className={style.siteContainer}>
        <SettingsNavigation
          isMenuActive={isMenuActive}
          onToggleMenu={toggleMenuHandler}/>
        <ContentContainer onToggleMenu={toggleMenuHandler}>
          <Routes>
            <Route path="change_password" element={<PasswordChange />} />
            {/* Linijka nizej do poprawy */}
            {(isHeadAdmin || permissionsArray.length>0) && <Fragment>
              <Route path="add_question" element={<AddQuestion />} />
              <Route path="modify_question" element={<ModifyQuestion/>}/>
            </Fragment>}
            {isHeadAdmin && <Fragment>
              <Route path="manage_courses" element={<ManageCourses />}></Route>
              <Route path="manage_schools" element={<SchoolsManager />}></Route>
            </Fragment>}
          </Routes>
        </ContentContainer>
      </div>
    </Fragment>
  );
}
