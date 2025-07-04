import React, { useState } from 'react'
import { Modal, Button, Input, Card, CardHeader, CardBody } from '@/components/ui'

export const ModalTest: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [showLargeModal, setShowLargeModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    setShowModal(false)
    setFormData({ name: '', email: '' })
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">🎭 Modal Functionality Test</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <p className="text-gray-600">
            Test modal functionality dengan berbagai ukuran dan konten:
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="primary" 
              onClick={() => setShowModal(true)}
            >
              📝 Open Form Modal
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={() => setShowLargeModal(true)}
            >
              📊 Open Large Modal
            </Button>
          </div>
          
          {/* Form Modal */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="📝 Test Form Modal"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                Test modal dengan form input dan validation:
              </p>
              
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal>
          
          {/* Large Modal */}
          <Modal
            isOpen={showLargeModal}
            onClose={() => setShowLargeModal(false)}
            title="📊 Large Content Modal"
            size="xl"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">✅ Modal Features Working</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• ESC key to close</li>
                    <li>• Backdrop click to close</li>
                    <li>• Multiple sizes (sm, md, lg, xl)</li>
                    <li>• Body scroll lock</li>
                    <li>• Proper z-index layering</li>
                    <li>• Mobile responsive</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">📱 Responsive Test</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Resize browser window untuk test:</p>
                    <div className="bg-gray-100 p-3 rounded">
                      <p>Desktop: Full modal width</p>
                      <p>Tablet: Adapted width</p>
                      <p>Mobile: Full screen friendly</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <Button 
                  variant="primary" 
                  onClick={() => setShowLargeModal(false)}
                  className="w-full"
                >
                  Close Large Modal
                </Button>
              </div>
            </div>
          </Modal>
          
          {/* Test Results */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">🧪 Expected Results:</h4>
            <div className="text-sm text-green-600 space-y-1">
              <p>• Modal opens/closes smoothly</p>
              <p>• ESC key closes modal</p>
              <p>• Clicking outside closes modal</p>
              <p>• Form inputs work properly</p>
              <p>• Responsive on mobile devices</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}