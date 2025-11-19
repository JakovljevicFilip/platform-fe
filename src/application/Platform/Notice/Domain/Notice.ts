/**
 * Notice domain models feedback and caution messages
 * produced during validation or runtime events.
 * It is designed to be platform-agnostic and reusable across all domains.
 */

/** Possible visual or semantic styles for a notice */
export enum Style {
  danger = 'danger',
  warning = 'warning',
  info = 'info',
}

/** Represents a single notice message */
export class Notice {
  constructor(
    public title: string,
    public subtitle: string,
    public style: Style
  ) {}
}

/** Represents a group of notice messages based on the domain */
export class DomainNotices {
  constructor(
    public domainName: string,
    public notices: Notice[] = []
  ) {}
}

/** Represents a collection of domain notices */
export class Notices {
  constructor(public notices: DomainNotices[] = []) {}
}
