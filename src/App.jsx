// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider } from './AuthContext';

// Pages
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Welcome from './pages/Welcome.jsx';
import ServiceDatesPage from './pages/ServiceDatesPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { BvaSearch } from './pages/BvaSearch.jsx';
import Documents from './pages/Documents.jsx';
import { DecisionDetails } from './pages/DecisionDetails.jsx';
import AccountPage from './pages/AccountPage.jsx';
import ChatContainer from './pages/ChatContainer.jsx';
import SavedDecisions from './pages/SavedDecisions.jsx';
import Conditions from './pages/ConditionsPage.jsx';
import AllChatsPage from './pages/AllChatsPage.jsx';
import ClaimsOverviewPage from './pages/ClaimsOverviewPage.jsx';
import ClaimDetailsPage from './pages/ClaimDetailsPage';
import StatementsPage from './pages/StatementsPage.jsx';
import NexusUpdatesPage from './pages/NexusUpdatesPage.jsx';
import './index.css';
// Layout that includes Header + Sidebar
import Layout from './components/Layout.jsx';
import WelcomeTwo from './pages/WelcomeTwo';

function App() {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public / unauthenticated routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/welcome" element={
              <PrivateRoute>
                <WelcomeTwo />
              </PrivateRoute>} />
            <Route path="/service-dates" element={
              <PrivateRoute>
                <ServiceDatesPage />
              </PrivateRoute>} />
            <Route path="/confirmation" element={
              <PrivateRoute>
                <ConfirmationPage />
              </PrivateRoute>
            } />

            {/* Authenticated / main application routes */}
            <Route element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bvasearch" element={<BvaSearch />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/decision" element={<DecisionDetails />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/chat" element={<ChatContainer />} />
              <Route path="/all-chats" element={<AllChatsPage />} />
              <Route path="/saved-decisions" element={<SavedDecisions />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/claims" element={<ClaimsOverviewPage />} />
              <Route path="/claims/:claimId" element={<ClaimDetailsPage />} />
              <Route path="/statements" element={<StatementsPage />} />
              <Route path="/nexus-updates" element={<NexusUpdatesPage />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
