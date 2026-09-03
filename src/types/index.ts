export interface UserProfile {
  id: string;
  steamId: string;
  nickname: string;
  avatar: string | null;
  profileUrl: string | null;
  mmr: number;
  rank: string;
  wins: number;
  losses: number;
}

export interface TournamentData {
  id: string;
  name: string;
  game: string;
  format: string;
  status: string;
  maxTeams: number;
  teamSize: number;
  description: string | null;
  imageUrl: string | null;
  startDate: string;
  endDate: string | null;
  prizePool: string | null;
  _count?: { participants: number };
}

export interface MatchData {
  id: string;
  round: number;
  matchNumber: number;
  homePlayerId: string | null;
  awayPlayerId: string | null;
  homeScore: number | null;
  awayScore: number | null;
  winner: string | null;
  status: string;
  homePlayer?: { nickname: string; avatar: string | null } | null;
  awayPlayer?: { nickname: string; avatar: string | null } | null;
}
