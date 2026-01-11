import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'
import './App.css'

function App() {
  const [deviceInfo, setDeviceInfo] = useState(null)
  const [showScamAlert, setShowScamAlert] = useState(false)

  useEffect(() => {
    const parser = new UAParser()
    const result = parser.getResult()
    setDeviceInfo(result)

    // Simulate a scam alert after 2 seconds
    const timer = setTimeout(() => {
      setShowScamAlert(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const closeAlert = () => {
    setShowScamAlert(false)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Browser Security Awareness</h1>
        <p className="subtitle">
          Understanding how scammers use your device information against you
        </p>
      </header>

      <main>
        <div className="content-wrapper">
          <section className="info-section">
            <h2>Your Device Information</h2>
            <div className="device-info-card">
              {deviceInfo ? (
                <>
                  <h3>What websites can see about your device:</h3>
                  <div className="info-grid">
                    {deviceInfo.device.model && (
                      <div className="info-item">
                        <strong>Device Model:</strong> {deviceInfo.device.model}
                      </div>
                    )}
                    {deviceInfo.device.type && (
                      <div className="info-item">
                        <strong>Device Type:</strong> {deviceInfo.device.type}
                      </div>
                    )}
                    <div className="info-item">
                      <strong>Browser:</strong> {deviceInfo.browser.name}{' '}
                      {deviceInfo.browser.version}
                    </div>
                    <div className="info-item">
                      <strong>Operating System:</strong> {deviceInfo.os.name}{' '}
                      {deviceInfo.os.version}
                    </div>
                    {deviceInfo.cpu.architecture && (
                      <div className="info-item">
                        <strong>CPU Architecture:</strong> {deviceInfo.cpu.architecture}
                      </div>
                    )}
                  </div>
                  <div className="raw-data">
                    <details>
                      <summary>View Raw Data</summary>
                      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>
                    </details>
                  </div>
                </>
              ) : (
                <p>Loading device information...</p>
              )}
            </div>
          </section>

          <section className="educational-section">
            <h2>The Scam: "Your Browser Is Infected!"</h2>

            <div className="scam-example">
              <h3>What happens in this scam:</h3>
              <ol>
                <li>You visit a website (often via a malicious ad or redirect)</li>
                <li>A popup appears claiming your device has viruses</li>
                <li>It shows specific details about your device to appear legitimate</li>
                <li>
                  It urges you to download "security software" or call a "tech support" number
                </li>
              </ol>
            </div>

            <div className="important-facts">
              <h3>Important Facts You Need to Know:</h3>

              <div className="fact-card critical">
                <h4>🚨 CRITICAL: Device info is PUBLIC</h4>
                <p>
                  Every website you visit can access basic information about your browser and
                  device. This is normal and necessary for websites to function properly.
                </p>
                <p>
                  The fact that a popup says "Your iPhone" or "Your Chrome browser" means{' '}
                  <strong>NOTHING</strong> - it's just reading public data.
                </p>
              </div>

              <div className="fact-card warning">
                <h4>⚠️ "Your phone has 3 viruses" is MEANINGLESS</h4>
                <p>
                  Legitimate security software <strong>cannot</strong> scan your device through a
                  website without your explicit permission.
                </p>
                <p>
                  Any website claiming to detect viruses without installing software first is{' '}
                  <strong>100% fake</strong>.
                </p>
              </div>

              <div className="fact-card info">
                <h4>ℹ️ What scammers are actually doing:</h4>
                <ul>
                  <li>
                    Using the <code>navigator.userAgent</code> string (available to all websites)
                  </li>
                  <li>Parsing it with tools like the one used on this page</li>
                  <li>Displaying generic information to make the scam seem personalized</li>
                  <li>Trying to scare you into taking harmful actions</li>
                </ul>
              </div>
            </div>

            <div className="protection-guide">
              <h3>How to Protect Yourself:</h3>
              <div className="protection-grid">
                <div className="protection-item">
                  <div className="icon">❌</div>
                  <h4>DO NOT:</h4>
                  <ul>
                    <li>Download any "security software" from these popups</li>
                    <li>Call any "tech support" numbers provided</li>
                    <li>Enter payment information for "virus removal"</li>
                    <li>Grant remote access to your device</li>
                  </ul>
                </div>

                <div className="protection-item">
                  <div className="icon">✅</div>
                  <h4>DO:</h4>
                  <ul>
                    <li>Close the browser tab immediately</li>
                    <li>Use your device's built-in security software for scans</li>
                    <li>Install apps only from official app stores</li>
                    <li>Keep your browser and OS updated</li>
                    <li>Use a reputable ad-blocker to prevent malicious ads</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {showScamAlert && (
        <div className="scam-alert-overlay">
          <div className="scam-alert-modal">
            <div className="scam-alert-header">
              <span className="alert-icon">⚠️</span>
              <h2>CRITICAL ALERT: Security Threat Detected</h2>
            </div>
            <div className="scam-alert-body">
              <p>
                <strong>
                  Your {deviceInfo?.device.model || deviceInfo?.device.name || 'device'} ({deviceInfo?.os.name} {deviceInfo?.os.version}) is infected with 3 viruses!
                </strong>
              </p>
              <p>Malware detected in {deviceInfo?.browser.name} browser. Immediate action required.</p>
              <p>
                Call Apple Support immediately:{' '}
                <strong className="fake-number">1-800-555-0199</strong>
              </p>
              <p className="scam-disclaimer">
                (This is a simulated scam alert for educational purposes)
              </p>
            </div>
            <div className="scam-alert-footer">
              <button className="scam-button" onClick={closeAlert}>
                Call Now (This is what scammers want)
              </button>
              <button className="safe-button" onClick={closeAlert}>
                Close & Ignore (This is the safe choice)
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>
          This educational tool demonstrates how scammers use publicly available device information
          to create convincing fake alerts.
        </p>
        <p className="footer-note">
          Remember: Legitimate security warnings never appear as website popups asking for
          immediate action.
        </p>
      </footer>
    </div>
  )
}

export default App
