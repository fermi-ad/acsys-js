import { exec } from 'child_process';

// download proto_lib.js source file as .ts
exec(
   `curl -L https://cdcvs.fnal.gov/redmine/projects/protocol-compiler/repository/revisions/master/raw/proto_lib.js > proto_lib.ts`
);
