import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import OnboardingForm from "../../components/auth/OnboardingForm";

export default function Onboarding() {
  return (
    <>
      <PageMeta
        title="Onboarding | TailAdmin - Next.js Admin Dashboard Template"
        description="This is the Onboarding page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <OnboardingForm />
      </AuthLayout>
    </>
  );
}