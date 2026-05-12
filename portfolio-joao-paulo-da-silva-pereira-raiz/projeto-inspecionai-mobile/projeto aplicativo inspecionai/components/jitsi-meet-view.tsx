import { View, Text, Pressable, Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { useEffect, useState } from "react";
import WebView from "react-native-webview";

interface JitsiMeetViewProps {
  roomName: string;
  onLeave: () => void;
  userDisplayName?: string;
}

export function JitsiMeetView({
  roomName,
  onLeave,
  userDisplayName = "Auditor",
}: JitsiMeetViewProps) {
  const colors = useColors();
  const [isLoading, setIsLoading] = useState(true);

  // URL do Jitsi Meet (usando instância pública)
  const jitsiURL = `https://meet.jit.si/${encodeURIComponent(roomName)}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>InspecionAI - Videoconferência</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html, body {
          width: 100%;
          height: 100%;
          background: #000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }
        #jitsi-container {
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="jitsi-container"></div>
      <script src="https://meet.jit.si/external_api.js"></script>
      <script>
        const domain = "meet.jit.si";
        const options = {
          roomName: "${roomName}",
          width: "100%",
          height: "100%",
          parentNode: document.querySelector("#jitsi-container"),
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableSimulcast: false,
            enableLobbyMode: false,
            enableWelcomePage: false,
            enableClosePage: false,
          },
          interfaceConfigOverwrite: {
            DEFAULT_BACKGROUND: "#001F3F",
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "desktop",
              "fullscreen",
              "fodeviceselection",
              "hangup",
              "profile",
              "chat",
              "recording",
              "livestreaming",
              "etherpad",
              "settings",
              "raisehand",
              "videoquality",
              "filmstrip",
              "feedback",
              "stats",
              "shortcuts",
              "tileview",
              "select-background",
              "download-profile",
            ],
            SHOW_JITSI_WATERMARK: false,
            MOBILE_APP_PROMO: false,
          },
          userInfo: {
            displayName: "${userDisplayName}",
          },
        };

        try {
          const api = new JitsiMeetExternalAPI(domain, options);

          api.addEventListener("videoConferenceJoined", () => {
            console.log("Usuário entrou na conferência");
          });

          api.addEventListener("videoConferenceLeft", () => {
            console.log("Usuário saiu da conferência");
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: "CONFERENCE_LEFT" }));
            }
          });

          api.addEventListener("readyToClose", () => {
            console.log("Pronto para fechar");
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: "READY_TO_CLOSE" }));
            }
          });
        } catch (error) {
          console.error("Erro ao inicializar Jitsi Meet:", error);
        }
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "CONFERENCE_LEFT" || data.type === "READY_TO_CLOSE") {
        onLeave();
      }
    } catch (e) {
      console.error("Erro ao processar mensagem do WebView:", e);
    }
  };

  // Para web, renderizar iframe diretamente
  if (Platform.OS === "web") {
    return (
      <View className="flex-1 bg-black relative">
        <iframe
          src={jitsiURL}
          allow="camera; microphone; display-capture"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: 0,
          }}
        />
        {/* Botão de Saída Flutuante para Web */}
        <Pressable
          onPress={onLeave}
          style={({ pressed }) => ({
            position: "absolute",
            bottom: 20,
            right: 20,
            opacity: pressed ? 0.7 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
            zIndex: 1000,
          })}
        >
          <View
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.error }}
          >
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.background }}
            >
              ✕
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  // Para mobile, usar WebView
  return (
    <View className="flex-1 bg-black relative">
      <WebView
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        onMessage={handleMessage}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
        onLoadEnd={() => setIsLoading(false)}
      />

      {/* Botão de Saída Flutuante */}
      <Pressable
        onPress={onLeave}
        style={({ pressed }) => ({
          position: "absolute",
          bottom: 20,
          right: 20,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
      >
        <View
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.error }}
        >
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.background }}
          >
            ✕
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
