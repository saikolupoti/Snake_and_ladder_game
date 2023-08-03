#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define BOARD_SIZE 100
#define snakes 6
#define ladders 6  

int snakes_start[snakes] = {11,22, 44, 66, 85, 99};
int snakes_end[snakes] = {1,2, 10, 20, 39, 24};

int ladders_start[snakes] = {5,6, 15, 45, 75, 88};
int ladders_end[snakes] = {25,10,35, 87, 82, 95};

int roll() {
    return (rand() % 6) + 1;
}

int snakeandlad(int position) {
    int i;

    for (i = 0; i < snakes; i++) {
        if (position == snakes_start[i]) {
            position = snakes_end[i];
            printf("you are on snake position");
        }
    }

    for (i = 0; i < ladders; i++) {
        if (position == ladders_start[i]) {
            position = ladders_end[i];
            printf("you got ladder");
        }
    }

    return position;
}

int main() {
    srand(time(NULL));

    int player1pos = 0;
    int player2pos = 0;
    int diceRoll, new_pos;
    printf("This code is done by K Sai Prakash\n");
    printf("Welcome to Snake and Ladders game\n");

    while (1) {
        printf("Player 1's turn press enter to roll\n");
        getchar();

        diceRoll = roll();
        printf("Player 1 got a %d.\n", diceRoll);
        new_pos= player1pos + diceRoll;
        if (new_pos <= BOARD_SIZE) {
            new_pos = snakeandlad(new_pos);
            player1pos = new_pos;
            printf("Player 1 is now at position %d.\n", player1pos);
        } else {
            printf("Exceded the board size\n");
        }

        if (player1pos >= BOARD_SIZE) {
            printf("Congratulations! Player 1 WON\n");
            break;
        }

        printf("Player 2's turn press enter to roll\n");
        getchar();

        diceRoll = roll();
        printf("Player 2 got a %d.\n", diceRoll);
        new_pos = player2pos + diceRoll;
        if (new_pos <= BOARD_SIZE) {
            new_pos = snakeandlad(new_pos);
            player2pos = new_pos;
            printf("Player 2 is now at position %d.\n", player2pos);
        } else {
            printf("Exceded the board size\n");
        }

        if (player2pos >= BOARD_SIZE) {
            printf("Congratulations! Player 2 WON\n");
            break;
        }
    }

    return 0;
}
