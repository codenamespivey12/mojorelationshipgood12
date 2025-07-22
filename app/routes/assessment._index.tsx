export default function AssessmentIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Relationship Assessment
        </h1>
        <p className="text-lg text-gray-600">
          This comprehensive assessment will help you understand your relationship patterns across 5 key areas.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Assessment Overview</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold">1</div>
            <span>Attachment Style</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold">2</div>
            <span>Communication & Conflict Resolution</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold">3</div>
            <span>Emotional Intelligence</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold">4</div>
            <span>Love Languages</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold">5</div>
            <span>Additional Relationship Factors</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-[#B13BFF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
            Begin Assessment
          </button>
        </div>
      </div>
    </div>
  );
}