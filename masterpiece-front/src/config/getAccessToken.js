// Retrieve access token
export default function getAccessToken(key) {
	const expiry_token = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!expiry_token) {
		return null
	}
	const token = JSON.parse(expiry_token)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > token.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
    }
	return token.value
}
