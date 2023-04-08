import Privacy from "../src/Catalog/Messages/Pages/Privacy/Privacy";
import { PrivacyFlag } from "../src/Catalog/Messages/Pages/Privacy/PrivacyFlag";

describe('Privacy', () => {
  let privacy = new Privacy();
  const assertHasFlag = (flag: PrivacyFlag) => expect(privacy.hasFlag(flag)).toBeTruthy();
  const assertDoesntHaveFlag = (flag: PrivacyFlag) => expect(privacy.hasFlag(flag)).toBeFalsy();

  const assertHasOnlyFlags = (included: PrivacyFlag[]) => {
    const excluded = new Set([
      PrivacyFlag.FRIENDS_READ,
      PrivacyFlag.FIENDS_WRITE,
      PrivacyFlag.MEMBER_READ,
      PrivacyFlag.MEMBER_WRITE,
      PrivacyFlag.GUEST_READ,
      PrivacyFlag.GUEST_WRITE,
    ]);

    included.forEach(flag => excluded.delete(flag));

    included.forEach(flag => assertHasFlag(flag));
    Array.from(excluded).forEach(flag => {
      assertDoesntHaveFlag(flag)
    });
  }

  test('Add/remove flags', () => {
    privacy.addFlag(PrivacyFlag.FRIENDS_READ);
    assertHasOnlyFlags([
      PrivacyFlag.FRIENDS_READ
    ]);

    privacy.removeFlag(PrivacyFlag.FRIENDS_READ);
    assertHasOnlyFlags([]);

    privacy.addFlag(PrivacyFlag.FIENDS_WRITE);
    assertHasOnlyFlags([
      PrivacyFlag.FRIENDS_READ,
      PrivacyFlag.FIENDS_WRITE
    ]);

    privacy.addFlag(PrivacyFlag.MEMBER_WRITE);
    assertHasOnlyFlags([
      PrivacyFlag.FRIENDS_READ,
      PrivacyFlag.FIENDS_WRITE,
      PrivacyFlag.MEMBER_READ,
      PrivacyFlag.MEMBER_WRITE,
    ]);

    privacy.addFlag(PrivacyFlag.GUEST_READ);
    assertHasOnlyFlags([
      PrivacyFlag.FRIENDS_READ,
      PrivacyFlag.FIENDS_WRITE,
      PrivacyFlag.MEMBER_READ,
      PrivacyFlag.MEMBER_WRITE,
      PrivacyFlag.GUEST_READ
    ]);

    privacy.addFlag(PrivacyFlag.GUEST_READ);
    assertHasOnlyFlags([
      PrivacyFlag.FRIENDS_READ,
      PrivacyFlag.FIENDS_WRITE,
      PrivacyFlag.MEMBER_READ,
      PrivacyFlag.MEMBER_WRITE,
      PrivacyFlag.GUEST_READ
    ]);

    privacy.removeFlag(PrivacyFlag.GUEST_READ);
    privacy.addFlag(PrivacyFlag.GUEST_WRITE);
    assertHasOnlyFlags([
      PrivacyFlag.FRIENDS_READ,
      PrivacyFlag.FIENDS_WRITE,
      PrivacyFlag.MEMBER_READ,
      PrivacyFlag.MEMBER_WRITE,
      PrivacyFlag.GUEST_READ,
      PrivacyFlag.GUEST_WRITE,
    ]);
  });
})
