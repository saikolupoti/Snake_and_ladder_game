#include<stdio.h>
#include<stdlib.h>

int main() {
    int i,dices,pos1=0,pos2=0;
    char ch;
    while(1)
    {
        printf("\t\t WELCOME TO SNALE AND LADDER GAME \t\t\n");
        printf("Snakes:35 to 6\t, 55 to 31\t,94 to 11\t,88 to 30\n");
        printf("Ladders: 2 to 36\t,24 to 48\t,35 to 80\t,50 to 96\n");
        printf("Select your player number:\n");
        printf("1.player 1\n");
        printf("2.player 2\n");
        printf("0 to exit\n");
        scanf("%s",&ch);
        switch(ch)
        {
            case '1':dices=rd();
            system("cls");
            printf("\t\tDices= %d\n",dices);
            if(dices==6)
            printf("you got another chance\n");
            pos1=dices+pos1;
            if(pos1<101){
                if(pos1==94)
						{
						displaychart(11,"P1");
						}
						if(pos1==88)
						{
						displaychart(30,"P1");
						}
						if(pos1==55)
						{
						displaychart(31,"P1");
						}
                        if(pos1==35)
						{
						displaychart(6,"P1");
						}
						if(pos1==2)
						{
						displaychart(36,"P1");
						}
                        if(pos1==24)
						{
						displaychart(48,"P1");
						if(pos1==35)
						{
						displaychart(80,"P1");
						}
						if(pos1==50)
						{
						displaychart(96,"P1");
						}
                        else{
                            displaychart(pos1,"P1");
                        }
                }
                else{
                    pos1=pos1-dices;
                    printf("out of the game numbers\n");
                    displaychart(pos1,"P1");
                }
            break;
            case '2':dices=rd();
            system("cls");
            printf("\t\tDices = %d\n",dices);
            pos2=dices+pos2;
            if(pos2<101){
                if(pos2==94)
						{
						displaychart(11,"P2");
						}
						if(pos2==88)
						{
						displaychart(30,"P2");
						}
						if(pos2==55)
						{
						displaychart(31,"P2");
						}
                        if(pos2==35)
						{
						displaychart(6,"P2");
						}
						if(pos2==2)
						{
						displaychart(36,"P2");
						}
                        if(pos2==24)
						{
						displaychart(48,"P2");
						if(pos2==35)
						{
						displaychart(80,"P2");
						}
						if(pos2==50)
						{
						displaychart(96,"P2");
						}
                        else{
                            displaychart(pos2,"P2");
                        }
                }
                else{
                    pos2=pos2-dices;
                    printf("out of the game numbers\n");
                    displaychart(pos2,"P2");
                }
            break;
            case '3':exit(0);
            break;
        default:printf("wrong choice\n");
        }
    }
}

int rd()
{
    int rem;
    A: rem=rand()%7;
    if(rem=0){
        goto A;
    }
    else {
        return rem;
    }
}
void displaychart(int cur,char player[4])
{	int i,j,t,c,sft=0,diceres,cur_pos1,cur_pos2;
	
		
		if(cur==100)
		{
			printf("=======Congratulations======\n\n\nyou won\n",player);
			scanf("%*s");
			exit(0);
		}
	
	for(i=10;i>0;i--)
	{
		t=i-1;
		if((sft%2)==0)
		{
			c=0;
			for(j=10;j>=1;j--)
			{
				diceres=(i*j)+(t*c++);
				
				if(cur==diceres)
					printf("%s\t",player);
				else
				printf("%d\t",diceres);
		
			}
			sft++;
		}
		else
		{
			c=9;
			for(j=1;j<=10;j++)
			{
				diceres=(i*j)+(t*c--);
				
				if(curp==diceres)
					printf("%s\t",player);
				else
					printf("%d\t",diceres);
			}
		
			
			sft++;
		}
		printf("\n\n");
	}

	printf("--------------------------------------------------------------------------\n");
}