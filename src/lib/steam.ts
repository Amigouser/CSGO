const STEAM_API_BASE = "https://api.steampowered.com";

export async function getSteamProfile(steamId: string) {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `${STEAM_API_BASE}/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`
    );
    const data = await res.json();
    const player = data?.response?.players?.[0];
    if (!player) return null;

    return {
      steamId: player.steamid,
      nickname: player.personaname,
      avatar: player.avatarfull,
      profileUrl: player.profileurl,
    };
  } catch {
    return null;
  }
}


