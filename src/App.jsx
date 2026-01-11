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

    // Simular una alerta de estafa después de 2 segundos
    const timer = setTimeout(() => {
      setShowScamAlert(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const closeAlert = () => {
    setShowScamAlert(false)
  }

  // Función para obtener el nombre del dispositivo en español
  const getDeviceName = () => {
    if (!deviceInfo) return 'dispositivo'

    if (deviceInfo.device.model) return deviceInfo.device.model
    if (deviceInfo.device.name) return deviceInfo.device.name
    if (deviceInfo.device.vendor)
      return `${deviceInfo.device.vendor} ${deviceInfo.device.type || ''}`

    return 'dispositivo'
  }

  return (
    <div className="app-container">
      <header>
        <h1>Concienciación sobre Seguridad del Navegador</h1>
        <p className="subtitle">
          Comprende cómo los estafadores usan la información de tu dispositivo en tu contra
        </p>
      </header>

      <main>
        <div className="content-wrapper">
          <section className="info-section">
            <h2>Información de Tu Dispositivo</h2>
            <div className="device-info-card">
              {deviceInfo ? (
                <>
                  <h3>Lo que los sitios web pueden ver sobre tu dispositivo:</h3>
                  <div className="info-grid">
                    {deviceInfo.device.model && (
                      <div className="info-item">
                        <strong>Modelo del dispositivo:</strong> {deviceInfo.device.model}
                      </div>
                    )}
                    {deviceInfo.device.type && (
                      <div className="info-item">
                        <strong>Tipo de dispositivo:</strong> {deviceInfo.device.type}
                      </div>
                    )}
                    <div className="info-item">
                      <strong>Navegador:</strong> {deviceInfo.browser.name}{' '}
                      {deviceInfo.browser.version}
                    </div>
                    <div className="info-item">
                      <strong>Sistema Operativo:</strong> {deviceInfo.os.name}{' '}
                      {deviceInfo.os.version}
                    </div>
                    {deviceInfo.cpu.architecture && (
                      <div className="info-item">
                        <strong>Arquitectura de CPU:</strong> {deviceInfo.cpu.architecture}
                      </div>
                    )}
                  </div>
                  <div className="raw-data">
                    <details>
                      <summary>Ver Datos en Bruto</summary>
                      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>
                    </details>
                  </div>
                </>
              ) : (
                <p>Cargando información del dispositivo...</p>
              )}
            </div>
          </section>

          <section className="educational-section">
            <h2>La Estafa: "¡Tu Navegador Está Infectado!"</h2>

            <div className="scam-example">
              <h3>¿Qué ocurre en esta estafa?</h3>
              <ol>
                <li>
                  Visitas un sitio web (normalmente a través de un anuncio o redirección maliciosa)
                </li>
                <li>Aparece un popup afirmando que tu dispositivo tiene virus</li>
                <li>Muestra detalles específicos sobre tu dispositivo para parecer legítimo</li>
                <li>
                  Te urge a descargar "software de seguridad" o llamar a un número de "soporte
                  técnico"
                </li>
              </ol>
            </div>

            <div className="important-facts">
              <h3>Hechos Importantes que Necesitas Saber:</h3>

              <div className="fact-card critical">
                <h4>🚨 CRÍTICO: La información del dispositivo es PÚBLICA</h4>
                <p>
                  Cada sitio web que visitas puede acceder a información básica sobre tu navegador
                  y dispositivo. Esto es normal y necesario para que los sitios web funcionen
                  correctamente.
                </p>
                <p>
                  El hecho de que un popup diga "Tu iPhone" o "Tu navegador Chrome" significa{' '}
                  <strong>NADA</strong> - solo está leyendo datos públicos.
                </p>
              </div>

              <div className="fact-card warning">
                <h4>⚠️ "Tu teléfono tiene 3 virus" es SIN SENTIDO</h4>
                <p>
                  El software de seguridad legítimo <strong>no puede</strong> escanear tu
                  dispositivo a través de un sitio web sin tu permiso explícito.
                </p>
                <p>
                  Cualquier sitio web que afirme detectar virus sin instalar software primero es{' '}
                  <strong>100% falso</strong>.
                </p>
              </div>

              <div className="fact-card info">
                <h4>ℹ️ Lo que los estafadores están haciendo realmente:</h4>
                <ul>
                  <li>
                    Usando la cadena <code>navigator.userAgent</code> (disponible para todos los
                    sitios web)
                  </li>
                  <li>Analizándola con herramientas como la usada en esta página</li>
                  <li>Mostrando información genérica para que la estafa parezca personalizada</li>
                  <li>Intentando asustarte para que tomes acciones perjudiciales</li>
                </ul>
              </div>
            </div>

            <div className="protection-guide">
              <h3>Cómo Protegerse:</h3>
              <div className="protection-grid">
                <div className="protection-item">
                  <div className="icon">❌</div>
                  <h4>NO HAGAS:</h4>
                  <ul>
                    <li>Descargues ningún "software de seguridad" de estos popups</li>
                    <li>Llames a ningún número de "soporte técnico" proporcionado</li>
                    <li>Introduzcas información de pago para "eliminar virus"</li>
                    <li>Concedas acceso remoto a tu dispositivo</li>
                  </ul>
                </div>

                <div className="protection-item">
                  <div className="icon">✅</div>
                  <h4>HACE:</h4>
                  <ul>
                    <li>Cierra la pestaña del navegador inmediatamente</li>
                    <li>
                      Usa el software de seguridad incorporado en tu dispositivo para escaneos
                    </li>
                    <li>Instala aplicaciones solo desde tiendas oficiales de aplicaciones</li>
                    <li>Mantén tu navegador y sistema operativo actualizados</li>
                    <li>
                      Usa un bloqueador de anuncios de confianza para prevenir anuncios maliciosos
                    </li>
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
              <h2>ALERTA CRÍTICA: Amenaza de Seguridad Detectada</h2>
            </div>
            <div className="scam-alert-body">
              <p>
                <strong>
                  ¡Tu {getDeviceName()} ({deviceInfo?.os.name} {deviceInfo?.os.version}) está
                  infectado con 3 virus!
                </strong>
              </p>
              <p>
                Malware detectado en el navegador {deviceInfo?.browser.name}. Se requiere acción
                inmediata.
              </p>
              <p>
                Llama al Soporte de Apple inmediatamente:{' '}
                <strong className="fake-number">1-800-555-0199</strong>
              </p>
              <p className="scam-disclaimer">
                (Esta es una alerta de estafa simulada con fines educativos)
              </p>
            </div>
            <div className="scam-alert-footer">
              <button className="scam-button" onClick={closeAlert}>
                Llamar Ahora (Esto es lo que quieren los estafadores)
              </button>
              <button className="safe-button" onClick={closeAlert}>
                Cerrar e Ignorar (Esta es la opción segura)
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>
          Esta herramienta educativa demuestra cómo los estafadores usan información de dispositivo
          disponible públicamente para crear alertas falsas convincentes.
        </p>
        <p className="footer-note">
          Recuerda: Las advertencias de seguridad legítimas nunca aparecen como popups en sitios
          web pidiendo acción inmediata.
        </p>
      </footer>
    </div>
  )
}

export default App
