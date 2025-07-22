import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/lib/auth";
import { useState } from "react";

export async function loader(args: LoaderFunctionArgs) {
  return requireAuth(args);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  // Extract form data
  const userInfo = {
    age: formData.get("age") as string,
    gender: formData.get("gender") as string,
    sexualOrientation: formData.get("sexualOrientation") as string,
    race: formData.get("race") as string,
    relationshipStatus: formData.get("relationshipStatus") as string,
    previousRelationships: formData.get("previousRelationships") as string,
    relationshipGoals: formData.get("relationshipGoals") as string,
    additionalInfo: formData.get("additionalInfo") as string,
  };

  // TODO: Store user info in database/session
  // For now, we'll store in session and redirect to first assessment section
  
  return redirect("/assessment/section/1");
}

export default function UserInfoPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    sexualOrientation: "",
    race: "",
    relationshipStatus: "",
    previousRelationships: "",
    relationshipGoals: "",
    additionalInfo: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Tell Us About Yourself
        </h1>
        <p className="text-lg text-white/90">
          This information helps us provide more accurate and personalized insights. 
          All information is kept confidential and used only for analysis purposes.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <Form method="post" className="space-y-6">
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-white mb-2">
              Age Range
            </label>
            <select
              id="age"
              name="age"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              required
            >
              <option value="">Select your age range</option>
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55-64">55-64</option>
              <option value="65+">65+</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-white mb-2">
              Gender Identity
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              required
            >
              <option value="">Select your gender identity</option>
              <option value="woman">Woman</option>
              <option value="man">Man</option>
              <option value="non-binary">Non-binary</option>
              <option value="genderfluid">Genderfluid</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Sexual Orientation */}
          <div>
            <label htmlFor="sexualOrientation" className="block text-sm font-medium text-white mb-2">
              Sexual Orientation
            </label>
            <select
              id="sexualOrientation"
              name="sexualOrientation"
              value={formData.sexualOrientation}
              onChange={(e) => handleInputChange("sexualOrientation", e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              required
            >
              <option value="">Select your sexual orientation</option>
              <option value="heterosexual">Heterosexual</option>
              <option value="homosexual">Homosexual</option>
              <option value="bisexual">Bisexual</option>
              <option value="pansexual">Pansexual</option>
              <option value="asexual">Asexual</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Race/Ethnicity */}
          <div>
            <label htmlFor="race" className="block text-sm font-medium text-white mb-2">
              Race/Ethnicity
            </label>
            <select
              id="race"
              name="race"
              value={formData.race}
              onChange={(e) => handleInputChange("race", e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              required
            >
              <option value="">Select your race/ethnicity</option>
              <option value="white">White</option>
              <option value="black">Black or African American</option>
              <option value="hispanic">Hispanic or Latino</option>
              <option value="asian">Asian</option>
              <option value="native-american">Native American</option>
              <option value="pacific-islander">Pacific Islander</option>
              <option value="mixed">Mixed/Multiracial</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Relationship Status */}
          <div>
            <label htmlFor="relationshipStatus" className="block text-sm font-medium text-white mb-2">
              Current Relationship Status
            </label>
            <select
              id="relationshipStatus"
              name="relationshipStatus"
              value={formData.relationshipStatus}
              onChange={(e) => handleInputChange("relationshipStatus", e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              required
            >
              <option value="">Select your relationship status</option>
              <option value="single">Single</option>
              <option value="dating">Dating/Seeing someone</option>
              <option value="in-relationship">In a committed relationship</option>
              <option value="engaged">Engaged</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="its-complicated">It's complicated</option>
            </select>
          </div>

          {/* Previous Relationships */}
          <div>
            <label htmlFor="previousRelationships" className="block text-sm font-medium text-white mb-2">
              Previous Serious Relationships
            </label>
            <select
              id="previousRelationships"
              name="previousRelationships"
              value={formData.previousRelationships}
              onChange={(e) => handleInputChange("previousRelationships", e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              required
            >
              <option value="">Select number of previous serious relationships</option>
              <option value="0">None</option>
              <option value="1-2">1-2</option>
              <option value="3-5">3-5</option>
              <option value="6-10">6-10</option>
              <option value="10+">More than 10</option>
            </select>
          </div>

          {/* Relationship Goals */}
          <div>
            <label htmlFor="relationshipGoals" className="block text-sm font-medium text-white mb-2">
              What are you looking for in relationships?
            </label>
            <select
              id="relationshipGoals"
              name="relationshipGoals"
              value={formData.relationshipGoals}
              onChange={(e) => handleInputChange("relationshipGoals", e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-purple-400 focus:outline-none"
              required
            >
              <option value="">Select your relationship goals</option>
              <option value="casual-dating">Casual dating</option>
              <option value="serious-relationship">Serious long-term relationship</option>
              <option value="marriage">Marriage</option>
              <option value="companionship">Companionship</option>
              <option value="exploring">Still exploring/figuring it out</option>
              <option value="not-looking">Not currently looking</option>
            </select>
          </div>

          {/* Additional Information */}
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-white mb-2">
              Additional Information (Optional)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
              rows={4}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-purple-400 focus:outline-none"
              placeholder="Is there anything else you'd like us to know that might help with your analysis? (e.g., cultural background, specific relationship challenges, etc.)"
              maxLength={500}
            />
            <p className="text-sm text-gray-300 mt-1">
              {formData.additionalInfo.length}/500 characters
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-yellow-400/20 border-l-4 border-[#FFCC00] p-4 rounded">
            <p className="text-sm text-white">
              <strong>Privacy Notice:</strong> This information is used solely to provide you with more accurate and personalized relationship insights. Your data is encrypted, never shared with third parties, and you can request deletion at any time.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6">
            <Link
              to="/assessment"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Back
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#B13BFF] text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Continue to Assessment →"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
