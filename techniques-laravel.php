php artisan tinker
In the interactive shell, you can retrieve a user by ID or email:

@changing a user password:

php
Copy code
$user = App\Models\User::find(1); // Replace 1 with the user's ID
// or
$user = App\Models\User::where('email', 'user@example.com')->first();
2. Generate a New Password Hash:
php
Copy code
$newPassword = 'new_password';
$hashedPassword = Hash::make($newPassword);
3. Update the User's Password:
php
Copy code
$user->password = $hashedPassword;
$user->save();
Alternatively, you can use the update method:

php
Copy code
$user->update(['password' => $hashedPassword]);
Remember to replace App\Models\User with the actual namespace of your User model.

Putting it all together:

bash
Copy code
php artisan tinker
php
Copy code
$user = App\Models\User::find(1); // Replace 1 with the user's ID
$newPassword = 'new_password';
$hashedPassword = Hash::make($newPassword);
$user->update(['password' => $hashedPassword]);
