User {
id,
bio,
username,
email,
password,
avatar,
}

Sample {
id,
title,
description,
genre,
language,
closed,
created_by: User.id
}

Proposal {
id,
artist_name,
song_title,
sample: Sample.id
created_by: User.id
accepted
}

Comment {
id,
body,
created_by,
sample: Sample.id
}
