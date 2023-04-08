export enum PrivacyFlag {
  FRIENDS_READ = 1 << 0,
  FIENDS_WRITE = PrivacyFlag.FRIENDS_READ | (1 << 1),

  MEMBER_READ = 1 << 2,
  MEMBER_WRITE = PrivacyFlag.MEMBER_READ | (1 << 3),

  GUEST_READ = 1 << 4,
  GUEST_WRITE = PrivacyFlag.GUEST_READ | (1 << 5),
}
