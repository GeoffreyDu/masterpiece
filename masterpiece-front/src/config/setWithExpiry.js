// Method called during login, to format the token with access token and when the session expires 
export default function setWithExpiry(key, value, ttl) {
    const now = new Date()

    const token_info = {
        value: value,
        expiry: now.getTime() + (ttl*1000)
    }
    localStorage.setItem(key, JSON.stringify(token_info))
}