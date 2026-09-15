interface FaceitPlayer {
  faceitId: string;
  nickname: string;
  level: number;
  elo: number;
}

export async function getFaceitPlayer(steamId: string): Promise<FaceitPlayer | null> {
  const apiKey = process.env.FACEIT_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://open.faceit.com/data/v4/players?game=cs2&game_player_id=${steamId}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const cs2 = data.games?.cs2;
    if (!cs2) return null;

    return {
      faceitId: data.player_id,
      nickname: data.nickname,
      level: cs2.skill_level ?? 0,
      elo: cs2.faceit_elo ?? 0,
    };
  } catch {
    return null;
  }
}
