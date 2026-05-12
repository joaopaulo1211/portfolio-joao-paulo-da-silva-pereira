{
  "entities": {
    "User": {
      "title": "User Profile",
      "description": "Stores user profile information and preferences.",
      "type": "object",
      "properties": {
        "uid": { "type": "string", "description": "Unique identifier for the user." },
        "email": { "type": "string", "format": "email", "description": "User's email address." },
        "displayName": { "type": "string", "description": "User's display name." },
        "photoURL": { "type": "string", "format": "uri", "description": "URL to the user's profile picture." },
        "createdAt": { "type": "string", "format": "date-time", "description": "When the user account was created." }
      },
      "required": ["uid", "email"]
    },
    "QRCode": {
      "title": "QR Code Configuration",
      "description": "Stores a saved QR code configuration and its generated background.",
      "type": "object",
      "properties": {
        "uid": { "type": "string", "description": "The UID of the user who owns this QR code." },
        "text": { "type": "string", "description": "The content encoded in the QR code." },
        "contentType": { "type": "string", "description": "The type of content (url, email, wifi)." },
        "vibe": { "type": "string", "description": "The AI prompt used to generate the background." },
        "backgroundImage": { "type": "string", "description": "The generated background image (base64)." },
        "fgColor": { "type": "string", "description": "Foreground color of the QR code." },
        "bgColor": { "type": "string", "description": "Background color of the QR code." },
        "qrSize": { "type": "integer", "description": "Size of the QR code in pixels." },
        "qrLevel": { "type": "string", "enum": ["L", "M", "Q", "H"], "description": "Error correction level." },
        "qrStyle": { "type": "string", "enum": ["squares", "dots"], "description": "Visual style of the QR code modules." },
        "qrMargin": { "type": "integer", "description": "Margin around the QR code." },
        "logoImage": { "type": "string", "description": "Optional logo image in the center (base64)." },
        "createdAt": { "type": "string", "format": "date-time", "description": "When the QR code was saved." }
      },
      "required": ["uid", "text", "contentType", "createdAt"]
    }
  },
  "firestore": {
    "/users/{userId}": {
      "schema": "User",
      "description": "User profile documents."
    },
    "/qrcodes/{qrcodeId}": {
      "schema": "QRCode",
      "description": "Saved QR codes for all users."
    }
  }
}
