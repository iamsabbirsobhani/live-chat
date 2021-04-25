<template>
    <div class="profile">
        <div class="profile-card">
            <div class="cover">
                <img class="cover-photo" src="../assets/profile2.jpg" alt="cover">
            </div>
            <div class="profile-photo-container">
                <img class="profile-photo" src="../assets/profile2.jpg" alt="cover">
            </div>
            <div class="info">
                <h3>Albion Johnson</h3>
                <p>world is rotating</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap');
    .profile {
        font-family: 'Roboto', sans-serif;
    }
    .profile-card {
        max-width: 600px;
        max-height: 200px;
        margin: 0px auto;
    }
    .cover {
        max-width: 600px;
        height: 200px;
    }
    .cover-photo {
        border-radius: 0px 0px  10px 10px;
        height: 100%;
        width: 100%;
    }
    .profile-photo {
        height: 100%;
        width: 100%;
        border-radius: 100px;
        border: 2px solid white;
    }
    .profile-photo-container {
        height: 110px;
        width: 110px;
        margin: auto;
        margin-top: -50px;
    }
    .info {
        text-align: center;
        line-height: 0.5;
    }
</style>>