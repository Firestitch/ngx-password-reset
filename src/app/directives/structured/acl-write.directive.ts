import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAcl } from '../../services/acl.service';


@Directive({
  selector: '[fsAclWrite]',
  inputs: [
    'aclRequestedPermissions: fsAclWrite',
    'aclThen: fsAclWriteThen',
    'aclElse: fsAclWriteElse',
    '_permissionObject: fsAclWriteObject',
    '_require: fsAclWriteRequire',
  ],
})
export class AclWriteDirective extends AclStructuredBaseDirective {

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAcl
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    return this._aclQuery.hasWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
