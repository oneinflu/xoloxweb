import React from 'react';
import { X, Zap, TrendingUp, AlertTriangle, Target, Brain } from 'lucide-react';

interface AIInsightsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  isOpen,
  onClose
}) => {
  const insights = {
    hotLeads: 12,
    warmLeads: 28,
    coldLeads: 15,
    predictedConversions: 8,
    recommendations: [
      {
        message: "Follow up with high-score leads in 'Contacted' stage",
        action: "Send personalized emails",
        count: 5,
        priority: 'high'
      },
      {
        message: "Leads in 'Interested' stage need proposals",
        action: "Generate proposals",
        count: 3,
        priority: 'medium'
      },
      {
        message: "Cold leads require nurturing campaigns",
        action: "Add to nurture sequence",
        count: 8,
        priority: 'low'
      }
    ],
    anomalies: [
      {
        type: "Unusual drop in conversion rate",
        count: 1,
        severity: 'warning'
      },
      {
        type: "High-value leads stuck in pipeline",
        count: 2,
        severity: 'critical'
      }
    ],
    predictions: [
      {
        metric: "Expected conversions this month",
        value: "12-15 leads",
        confidence: 85
      },
      {
        metric: "Revenue forecast",
        value: "$450K - $520K",
        confidence: 78
      },
      {
        metric: "Best performing source",
        value: "Website referrals",
        confidence: 92
      }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-gray-200 z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center space-x-2">
          <Zap className="h-6 w-6" />
          <h2 className="text-lg font-semibold">AI Insights</h2>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Lead Temperature */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Lead Temperature
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-red-800">🔥 Hot Leads</span>
              <span className="font-semibold text-red-900">{insights.hotLeads}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm text-yellow-800">🌡️ Warm Leads</span>
              <span className="font-semibold text-yellow-900">{insights.warmLeads}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-800">❄️ Cold Leads</span>
              <span className="font-semibold text-blue-900">{insights.coldLeads}</span>
            </div>
          </div>
        </div>

        {/* Predictions */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            AI Predictions
          </h3>
          <div className="space-y-3">
            {insights.predictions.map((prediction, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {prediction.metric}
                </div>
                <div className="text-lg font-semibold text-blue-600 mb-1">
                  {prediction.value}
                </div>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                  <span className="ml-2 text-xs text-gray-600">
                    {prediction.confidence}% confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Recommendations
          </h3>
          <div className="space-y-3">
            {insights.recommendations.map((rec, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{rec.message}</p>
                    <p className="text-xs text-blue-600 font-medium">{rec.action}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                    rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {rec.count} leads
                  </span>
                </div>
                <button className="w-full mt-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Take Action
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Anomalies */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Anomalies Detected
          </h3>
          <div className="space-y-3">
            {insights.anomalies.map((anomaly, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                anomaly.severity === 'critical' ? 'bg-red-50 border-red-500' :
                'bg-yellow-50 border-yellow-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      anomaly.severity === 'critical' ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      {anomaly.type}
                    </p>
                    <p className={`text-xs ${
                      anomaly.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {anomaly.count} instance{anomaly.count > 1 ? 's' : ''}
                    </p>
                  </div>
                  <button className={`px-3 py-1 text-xs rounded font-medium ${
                    anomaly.severity === 'critical' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  } transition-colors`}>
                    Investigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              Auto-assign Leads
            </button>
            <button className="p-3 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              Send Follow-ups
            </button>
            <button className="p-3 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              Generate Reports
            </button>
            <button className="p-3 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
              Update Scores
            </button>
          </div>
        </div>

        {/* AI Training */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">AI Learning</h3>
          <p className="text-xs text-gray-600 mb-3">
            Help improve AI accuracy by providing feedback on predictions and recommendations.
          </p>
          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              👍 Good Insights
            </button>
            <button className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              👎 Needs Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};