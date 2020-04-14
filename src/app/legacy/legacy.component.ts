import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { UserProfile } from '../models/user-profile';
import * as _ from 'lodash';

// Todo: Convert the predictions script to an Angular service.
import './js/predictions.js';

// Todo: Finish converting the stuff in this component to typescript.
// Todo: Get rid of jquery after changing the references below to native Angular/Typescript
import * as $ from 'jquery';
import './js/scripts.js';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss']
})
export class LegacyComponent implements OnInit {

  constructor(private authentication: AngularFireAuth, private database: AngularFireDatabase) { }

  ngOnInit(): void {
    this.authentication.onAuthStateChanged(this.updateLoginStatus.bind(this));
    $('#login').on('click', this.login.bind(this));
    $('#logout').on('click', this.logout.bind(this));
    $('#profileForm').on('input', _.debounce(this.updateProfile.bind(this), 500));
  }

public updateLoginStatus(user: User): void {
  this.watchUserProfile(user);

  if (user) {
        const username = user.email;

        $('#login').hide();
        $('#login-email').text('Logged in as: ' + username);
        $('#login-status').show();
    } else {

        $('#login-status').hide();
        $('#login-email').text('Logged out');
        $('#login').show();
    }
  }

  public login(): void {
    const provider = new auth.GoogleAuthProvider();

    this.authentication.signInWithPopup(provider).catch((error) => {
        // Handle Errors here.
        console.log('Error authenticating user:', error);
    });
  }

  private logout() {
    this.authentication.signOut().catch((error) => {
        console.log('Error signing user out:', error);
    });
  }

  private async saveUserProfile(name, friendCode, switchName, playerName, islandName, fruit, flower, creatorId, timezone) {
    const user = await this.authentication.currentUser;

    // Make sure we're logged in
    if (!user) {
        return;
    }

    // Default to name from Google
    if (!name) {
        name = user.displayName;
    }

    this.database.object<UserProfile>('user-profiles/' + user.uid).set({
        name,
        friendCode,
        switchName,
        playerName,
        islandName,
        fruit,
        flower,
        creatorId,
        timezone
      });
  }

  public async updateProfile(): Promise<void> {
    const name = $('#profile_name').val();
    const friendCode = $('#profile_friendCode').val();
    const switchName = $('#profile_switchName').val();
    const playerName = $('#profile_playerName').val();
    const islandName = $('#profile_islandName').val();
    const fruit = $('#profile_fruit').val();
    const flower = $('#profile_flower').val();
    const creatorId = $('#profile_creatorId').val();
    const timezone = $('#profile_timezone').val();

    await this.saveUserProfile(name, friendCode, switchName, playerName, islandName, fruit, flower, creatorId, timezone);
  }

  private setInputIfNotEqual(fieldId, value): void {
    const current = $(fieldId).val();

    if (current !== value) {
        $(fieldId).val(value);
    }
  }

  private watchUserProfile(user: User): void {

    // Make sure we're logged in
    if (!user) {
        return;
    }

    this.database.object<UserProfile>('user-profiles/' + user.uid).valueChanges().subscribe((profile) => {

        if (!profile) {
            return;
        }

        // Default to name from Google
        if (!profile.name) {
            profile.name = user.displayName;
        }

        this.setInputIfNotEqual('#profile_name', profile.name);
        this.setInputIfNotEqual('#profile_friendCode', profile.friendCode);
        this.setInputIfNotEqual('#profile_switchName', profile.switchName);
        this.setInputIfNotEqual('#profile_playerName', profile.playerName);
        this.setInputIfNotEqual('#profile_islandName', profile.islandName);
        this.setInputIfNotEqual('#profile_fruit', profile.fruit);
        this.setInputIfNotEqual('#profile_flower', profile.flower);
        this.setInputIfNotEqual('#profile_creatorId', profile.creatorId);
        this.setInputIfNotEqual('#profile_timezone', profile.timezone);
    });
  }
}
