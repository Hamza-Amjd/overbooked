import { Platform } from "react-native";

export const BASE_URL = Platform.OS === 'android' ? 'https://overbooked-server.vercel.app' : 'https://overbooked-server.vercel.app';