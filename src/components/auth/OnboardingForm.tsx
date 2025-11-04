import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from 'react-select';

const teamSizeOptions = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '500+', label: '500+' },
];

const sectorOptions = [
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'technology', label: 'Technology' },
    { value: 'reatil', label: 'Retail' },
    { value: 'other', label: 'Other' },
];

export default function OnboardingForm() {
  const [isGstRegistered, setIsGstRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Onboarding
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tell us more about your organization.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <Label>Organization Name<span className="text-error-500">*</span></Label>
                  <Input type="text" placeholder="Enter your organization's name" />
                </div>
                <div>
                  <Label>Organization Website</Label>
                  <Input type="url" placeholder="Enter your organization's website" />
                </div>
                <div>
                    <Label>Team Size<span className="text-error-500">*</span></Label>
                    <Select options={teamSizeOptions} />
                </div>
                <div>
                  <Label>Organization Address</Label>
                  <Input type="text" placeholder="Enter your organization's address" />
                </div>
                <div>
                  <Label>Is GST registered?<span className="text-error-500">*</span></Label>
                  <div className="flex items-center gap-3">
                    <input type="radio" id="gstYes" name="isGstRegistered" value="yes" onChange={() => setIsGstRegistered(true)} />
                    <label htmlFor="gstYes">Yes</label>
                    <input type="radio" id="gstNo" name="isGstRegistered" value="no" onChange={() => setIsGstRegistered(false)} />
                    <label htmlFor="gstNo">No</label>
                  </div>
                </div>
                {isGstRegistered ? (
                  <div>
                    <Label>GST Number</Label>
                    <Input type="text" placeholder="Enter your GST number" />
                  </div>
                ) : (
                  <div>
                    <Label>PAN Business</Label>
                    <Input type="text" placeholder="Enter your PAN business number" />
                  </div>
                )}
                <div>
                    <Label>Sector<span className="text-error-500">*</span></Label>
                    <Select options={sectorOptions} />
                </div>
                <div>
                  <Label>Business Logo</Label>
                  <Input type="file" />
                </div>
                <div>
                  <button type="submit" className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Complete Onboarding
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}