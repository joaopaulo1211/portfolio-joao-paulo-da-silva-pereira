rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ===============================================================
    // Assumed Data Model
    // ===============================================================
    //
    // Collection: users
    // Document ID: userId (matches auth.uid)
    // Fields:
    //   - uid: string (required) - matches auth.uid
    //   - email: string (required) - matches auth.token.email
    //   - displayName: string (optional)
    //   - photoURL: string (optional)
    //   - createdAt: timestamp (required)
    //
    // Collection: qrcodes
    // Document ID: auto-generated
    // Fields:
    //   - uid: string (required) - matches auth.uid
    //   - text: string (required) - content
    //   - contentType: string (required)
    //   - vibe: string (optional) - prompt
    //   - backgroundImage: string (optional) - base64
    //   - fgColor: string (optional)
    //   - bgColor: string (optional)
    //   - qrSize: number (optional)
    //   - qrLevel: string (optional)
    //   - qrStyle: string (optional)
    //   - qrMargin: number (optional)
    //   - logoImage: string (optional) - base64
    //   - createdAt: timestamp (required)
    //
    // ===============================================================

    // ===============================================================
    // Helper Functions
    // ===============================================================
    
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' ||
         (request.auth.token.email == "joaopaulo1211silva@gmail.com" && request.auth.token.email_verified == true));
    }

    function isValidEmail(email) {
      return email is string && email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    }

    function isValidUrl(url) {
      return url is string && (url.matches("^https://.*") || url.matches("^http://.*") || url.matches("^mailto:.*") || url.matches("^WIFI:.*"));
    }

    function hasRequiredFields(fields) {
      return request.resource.data.keys().hasAll(fields);
    }

    function hasOnlyAllowedFields(fields) {
      return request.resource.data.keys().hasOnly(fields);
    }

    function areImmutableFieldsUnchanged(fields) {
      return !request.resource.data.diff(resource.data).affectedKeys().hasAny(fields);
    }

    // ===============================================================
    // Domain Validators
    // ===============================================================

    function isValidUser(data) {
      return hasRequiredFields(['uid', 'email', 'createdAt']) &&
             data.uid == request.auth.uid &&
             data.email == request.auth.token.email &&
             isValidEmail(data.email) &&
             data.createdAt is timestamp;
    }

    function isValidQRCode(data) {
      return hasRequiredFields(['uid', 'text', 'contentType', 'createdAt']) &&
             data.uid == request.auth.uid &&
             data.text is string && data.text.size() < 2000 &&
             data.contentType is string &&
             data.createdAt is timestamp &&
             (!('vibe' in data) || (data.vibe is string && data.vibe.size() < 1000)) &&
             (!('backgroundImage' in data) || (data.backgroundImage is string && data.backgroundImage.size() < 2000000)) &&
             (!('fgColor' in data) || (data.fgColor is string && data.fgColor.size() < 10)) &&
             (!('bgColor' in data) || (data.bgColor is string && data.bgColor.size() < 10)) &&
             (!('qrSize' in data) || (data.qrSize is number && data.qrSize > 0)) &&
             (!('qrLevel' in data) || (data.qrLevel in ['L', 'M', 'Q', 'H'])) &&
             (!('qrStyle' in data) || (data.qrStyle in ['squares', 'dots'])) &&
             (!('qrMargin' in data) || (data.qrMargin is number)) &&
             (!('logoImage' in data) || (data.logoImage is string && data.logoImage.size() < 1000000));
    }

    // ===============================================================
    // Rules
    // ===============================================================

    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow create: if isAuthenticated() && isOwner(userId) && isValidUser(request.resource.data);
      allow update: if isAuthenticated() && isOwner(userId) && isValidUser(request.resource.data) && areImmutableFieldsUnchanged(['uid', 'createdAt']);
      allow delete: if isAdmin();
    }

    match /qrcodes/{qrcodeId} {
      allow read: if isAuthenticated() && (resource.data.uid == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && request.resource.data.uid == request.auth.uid && isValidQRCode(request.resource.data);
      allow update: if isAuthenticated() && resource.data.uid == request.auth.uid && isValidQRCode(request.resource.data) && areImmutableFieldsUnchanged(['uid', 'createdAt']);
      allow delete: if isAuthenticated() && (resource.data.uid == request.auth.uid || isAdmin());
    }
  }
}
