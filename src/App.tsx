import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import FormBuilder from "./pages/Forms/FormBuilder";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AllUsers from './pages/Users/AllUsers';

import InviteUser from "./pages/Users/InviteUser";
import RolesPermissions from "./pages/Users/RolesPermissions";
import SessionsAndDevices from "./pages/Users/SessionsAndDevices";
import AllLeads from "./pages/CRM/AllLeads";
import PipelinePage from "./pages/CRM/pipeline";
import WorkflowBuilder from "./pages/automation/builder/WorkflowBuilder";
import Reports from "./pages/insights/reports";
import EmailTemplates from "./pages/communications/email";
import SMSTemplates from "./pages/communications/sms";
import WhatsAppTemplates from "./pages/communications/whatsapp";

import IntegrationsPage from "./pages/integrations/main";
import OrganizationsPage from "./pages/organizations";




export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
              <Route path="/users" element={<AllUsers />} />
          <Route path="/users/roles" element={<RolesPermissions />} />
              <Route path="/users/invite" element={<InviteUser />} />
                <Route path="/users/sessions" element={<SessionsAndDevices />} />
                <Route path="/crm/leads" element={<AllLeads />} />
                <Route path="/crm/pipeline" element={<PipelinePage />} />
                <Route path="automation/builder" element={<WorkflowBuilder />} />
                <Route path="/communications/email" element={<EmailTemplates />} />
                <Route path="/communications/sms" element={<SMSTemplates />} />
            <Route path="/communications/whatsapp" element={<WhatsAppTemplates />} />

            <Route path="/integrations/api-keys" element={<IntegrationsPage />} />
            <Route path="/organizations" element={<OrganizationsPage />} />
           
              
            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
<Route path="insights/reports" element={<Reports />} />
            {/* Forms */}
            <Route path="/forms">
              <Route path="elements" element={<FormElements />} />
              <Route path="builder" element={<FormBuilder />} />
            </Route>

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
           
              
         
